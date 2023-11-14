import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Theme } from '../../models/theme';
import { TooltipDirection } from '../../models/tooltip-direction';
import { Subscription } from 'rxjs';
import { FocusTrackingService } from 'src/app/core/services/focus-tracking.service';
import { Translations } from 'src/app/core/services/translations.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FileSelectComponent {
  @Input({required: true}) label: string = '';
  @Input({required: true}) control!: FormControl;
  @Input() fileType: FileType | string = FileType.Image;
  @Input() view: FileSelectView | string = FileSelectView.Form; // TODO: Icon/Button
  @Input() tooltip!: string;
  @Input() tooltipDirection: TooltipDirection | string = TooltipDirection.Above;
  @Input() ariaLabel!: string; // Should only be used for FileSelectView.Icon
  @Input() theme: Theme | string = Theme.Primary1;

  // All 
  @Input() maxSize: number = 3145728; // Bytes
  @Input() ignoreExt: string[] = [];

  // Text
  @Input() maxLength: number = Number.MAX_SAFE_INTEGER;
  @Input() minLength: number = 0;

  // Photo 
  @Input() maxWidth: number = 1920;
  @Input() maxHeight: number = 1080;
  @Input() minWidth: number = 25;
  @Input() minHeight: number = 25;

  @ViewChild('gccFileSelect') fileInput!: ElementRef;

  error: string | undefined;
  photoName: string = '';
  FileSelectView = FileSelectView;
  requiredValidator = Validators.required;

  private filePickerHasOpened: boolean = false;
  private appInFocus: boolean = true;
  private focusSub!: Subscription;

  private textExtensions = [
    'txt', 'csv', 'json', 'xml', 'html', 'md', 'log', 
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 
    'odt', 'ods', 'odp', 'rtf', 'tex', 'epub'
  ];
  private imageExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 
    'tiff', 'webp', 'svg', 'ico'
  ];
  private audioExtensions = [
    'mp3', 'wav', 'ogg', 'aac', 'wma', 'flac',
     'm4a', 'ac3', 'amr', 'aiff', 'au'
    ];
  private videoExtensions = [
    'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 
    'webm', 'mpeg', 'm4v', '3gp', 'ogg'
  ];
  private blacklist: string[] = [
    'c', 'cgi', 'pl', 'class', 'cpp', 'cs', 'h', 'java', 'php', 
    'py', 'sh', 'swift', 'vb', 'asp', 'aspx', 'cer', 'cfm', 
    'css', 'htm', 'html', 'js', 'jsp', 'part', 'rss', 'xhtml', 
    'apk', 'bat', 'bin', 'com', 'exe', 'gadget', 'jar', 'msi', 'wsf'
  ];

  clickCallback: Function = this.openFilePicker.bind(this);
  blurCallback: Function = this.onPhotoBlur.bind(this);

  private langChangeSub!: Subscription;
  private previousTranslation: string | undefined;
  private previousError: string | undefined;

  constructor(private focusTrackingService: FocusTrackingService,
              public translations: Translations, private translateService: TranslateService) {
    this.langChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.onLangChange();
    });
  }

  ngOnInit(): void {
    this.focusSub = this.focusTrackingService.getAppFocusObservable().subscribe((isInFocus) => {
      this.appInFocus = isInFocus;
      if (isInFocus && this.filePickerHasOpened) {
        this.control.markAsTouched();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.focusSub)
      this.focusSub.unsubscribe();

    if (this.langChangeSub)
      this.langChangeSub.unsubscribe();
  }

  openFilePicker(): void {
    this.filePickerHasOpened = true;
    this.fileInput.nativeElement.click();
  }

  onPhotoBlur(): void {
    if (this.appInFocus && !this.filePickerHasOpened)
      this.control.markAsTouched();
  }

  onFileSelected(event: any): void {
    const selectedFile: File = event.target.files[0];

    if (selectedFile) {
      if (!this.isCorrectExtension(selectedFile.name)) {
        this.setError(this.translations.file_select.error.extension);
      }  
      else if (selectedFile.size > this.maxSize) {
        this.setError(this.translations.file_select.error.size, this.maxSize / 1024 + " KB.");
      }
      else {

        this.loadFile(selectedFile).then((dataURL) => {

          if (this.fileType == FileType.Text && dataURL.length > this.maxLength) {
            return this.setError(this.translations.file_select.error.characters, this.maxLength.toString());
          }
          else if (this.fileType == FileType.Image) {
            this.isCorrectDimensions(selectedFile).then((result) => {
              if (result !== true) 
                return this.setError(result as string);
            });
          }

          this.control.setValue(dataURL);
          this.photoName = selectedFile.name;
          this.clearError();
        }).catch((error) => {
          this.setError(this.translateService.instant(this.translations.file_select.error.read));
          console.error(error);
        });
      }
    }
    else
      this.control.markAsTouched();
  }
  
  private loadFile(file: File): Promise<string> {
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

  private isCorrectExtension(fileName: string): boolean {
    const fileExtension = fileName.split('.').pop();

    if (!fileExtension) 
      return false; 

    let valid = true;

    switch(this.fileType) {
      case FileType.Text:
        valid = this.textExtensions.includes(fileExtension.toLowerCase());
        break;
      case FileType.Image:
        valid = this.imageExtensions.includes(fileExtension.toLowerCase());
        break;
      case FileType.Audio:
        valid = this.audioExtensions.includes(fileExtension.toLowerCase());
        break;
      case FileType.Video:
        valid = this.videoExtensions.includes(fileExtension.toLowerCase());
        break;
      case FileType.All:
      default:
        break;
    }

    return valid && !this.blacklist.includes(fileExtension.toLowerCase());
  }

  private isCorrectDimensions(file: File, maxWidth: number = this.maxWidth, maxHeight: number = this.maxHeight, minWidth: number = this.minWidth, minHeight: number = this.minHeight): Promise<boolean | string> {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        let isLarge = width >= maxWidth || height >= maxHeight;
        let isSmall = width <= minWidth || height <= minHeight;

        if (!isLarge && !isSmall) {
          resolve(true); 
        } else {

          resolve(isLarge ? 
            this.translateService.instant(this.translations.file_select.error.img_large) + this.maxWidth + "x" + this.maxHeight : 
            this.translateService.instant(this.translations.file_select.error.img_small) + this.minWidth + "x" + this.minHeight);
        }
      };

      img.src = URL.createObjectURL(file);
    });
  }

  private setError(translation: string | undefined, error: string = ''): void {
    if (translation) {
      this.previousTranslation = translation;
      this.previousError = error;

      this.control.setValue('');
      this.control.markAsTouched();
      this.error = this.translateService.instant(translation) + error;
    }
  }

  private clearError() {
    this.error = undefined;
    this.previousTranslation = undefined;
    this.previousError = undefined;
  }

  private onLangChange() {
    if (this.error)
      this.setError(this.previousTranslation, this.previousError);
  }
}

enum FileType {
  Text = "text/plain, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  Image = "image/*",
  Audio = "audio/*",
  Video = "video/*",
  All = "*/*"
}

enum FileSelectView {
  Button = "button",
  Form = "form",
  Icon = "icon"
}