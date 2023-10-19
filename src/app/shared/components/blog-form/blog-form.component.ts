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
  maxCoverPhotoSize: number = 3145728;
  maxBlogLength: number = 2000;

  clickCallback: Function = this.openFilePicker.bind(this);
  blurCallback: Function = this.onPhotoBlur.bind(this);
  filePickerHasOpened: boolean = false;
  appInFocus: boolean = true;

  private focusSub!: Subscription;

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
      if (selectedFile.size <= this.maxCoverPhotoSize) {
        this.displaySelectedImage(selectedFile).then((dataURL) => {
          this.coverPhoto = selectedFile;
          this.model.coverPhoto = dataURL;
          this.form.controls['coverPhoto'].setValue(this.model.coverPhoto);
          this.coverPhotoError = undefined;
        }).catch((error) => {
          this.coverPhotoError = "Error reading the image." + error;
          console.error(error);
        });
      }
      else {
        this.coverPhoto = undefined;
        this.model.coverPhoto = '';
        this.form.controls['coverPhoto'].setValue(this.model.coverPhoto);
        this.coverPhotoError = "Photo is too large. Maximum size allowed is " + this.maxCoverPhotoSize / 1024 + " KB.";
      }
    }
    
    this.form.controls['coverPhoto'].markAsTouched();
  }

  displaySelectedImage(file: File): Promise<string> {
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
