import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { FocusTrackingService } from 'src/app/core/services/focus-tracking.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: IBlogForm = {
    name: '',
    publisher: '',
    coverPhoto: '',
    coverPhotoAlt: '',
    description: ''
  }

  @ViewChild('gccBlogCoverPhotoInput') fileInput!: ElementRef;
  errorStateMatcher = new MyErrorStateMatcher();

  coverPhoto: File | undefined;
  coverPhotoError: string | undefined;
  maxBlogLength: number = 2000;

  clickCallback: Function = this.openFilePicker.bind(this);
  blurCallback: Function = this.onPhotoBlur.bind(this);

  private filePickerHasOpened: boolean = false;
  private appInFocus: boolean = true;
  private focusSub!: Subscription;

  private maxCoverPhotoSize: number = 3145728;
  private coverPhotoMaxWidth: number = 1200;
  private coverPhotoMaxHeight: number = 800;

  constructor(private focusTrackingService: FocusTrackingService) {

  }

  ngOnInit(): void {
    if (Object.keys(this.form.controls).length === 0) {
      for (const [key, value] of Object.entries(this.model)) {
        this.form.addControl(key, new FormControl(value, [Validators.required]));
      }
    }

    this.focusSub = this.focusTrackingService.getAppFocusObservable().subscribe((isInFocus) => {
      this.appInFocus = isInFocus;
      if (isInFocus && this.filePickerHasOpened) {
        this.form.controls['coverPhoto'].markAsTouched();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.focusSub)
      this.focusSub.unsubscribe();

    this.form.reset();
  }

  openFilePicker(): void {
    this.filePickerHasOpened = true;
    this.fileInput.nativeElement.click();
  }

  onPhotoBlur(): void {
    if (this.appInFocus && !this.filePickerHasOpened)
      this.form.controls['coverPhoto'].markAsTouched();
  }

  onFileSelected(event: any): void {
    const selectedFile: File = event.target.files[0];

    if (selectedFile) {
      if (!this.isImage(selectedFile.name)) {
        this.setImageError("The file selected doesn't have an accepted image extension.");
      }  
      else if (selectedFile.size > this.maxCoverPhotoSize) {
        this.setImageError("Photo is too large. Maximum size allowed is " + this.maxCoverPhotoSize / 1024 + " KB.");
      }
      else {
        this.isCorrectDimensions(selectedFile, this.coverPhotoMaxWidth, this.coverPhotoMaxHeight).then((valid) => {

          if (!valid) 
            return this.setImageError("Photo dimensions have a maximum of " + this.coverPhotoMaxWidth + "x" + this.coverPhotoMaxHeight + ".");

          this.loadImage(selectedFile).then((dataURL) => {
            this.coverPhoto = selectedFile;
            this.model.coverPhoto = dataURL;
            this.form.controls['coverPhoto'].setValue(this.model.coverPhoto);
            this.coverPhotoError = undefined;
          }).catch((error) => {
            this.setImageError("Error reading the image." + error);
            console.error(error);
          });
        });
      }
    }

    this.form.controls['coverPhoto'].markAsTouched();
  }

  private loadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target?.result as string;
        resolve(dataURL);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  private isImage(fileName: string): boolean {
    const fileExtension = fileName.split('.').pop();

    if (!fileExtension) 
      return false; 
  
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg'];
    return imageExtensions.includes(fileExtension.toLowerCase());
  }

  private isCorrectDimensions(file: File, maxWidth: number, maxHeight: number): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width <= maxWidth && height <= maxHeight) {
          resolve(true); 
        } else {
          resolve(false);
        }
      };

      img.src = URL.createObjectURL(file);
    });
  }

  private setImageError(error: string): void {
    this.coverPhoto = undefined;
    this.model.coverPhoto = '';
    this.form.controls['coverPhoto'].setValue(this.model.coverPhoto);
    this.coverPhotoError = error;
  }
}

export interface IBlogForm {
  name: string;
  publisher: string;
  coverPhoto: string;
  coverPhotoAlt: string;
  description: string;
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
