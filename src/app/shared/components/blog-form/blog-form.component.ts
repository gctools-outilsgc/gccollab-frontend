import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { Validators as EditorValidators } from 'ngx-editor';

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
  @Input() disabled: boolean = false;

  errorStateMatcher = new MyErrorStateMatcher();

  maxBlogLength: number = 2000;

  constructor(public translations: Translations) {

  }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        if (key == 'description')
          this.form.addControl(key, new FormControl(value, [EditorValidators.required(), EditorValidators.maxLength(this.maxBlogLength)]));
        else
          this.form.addControl(key, new FormControl(value, [Validators.required]));
      } else {
        this.form.controls[key].setValue(value);
        console.warn('Duplicate FormControl detected.');
      }
    }
  }

  ngOnDestroy(): void {
    this.form.reset();
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
