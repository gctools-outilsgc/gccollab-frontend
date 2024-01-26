import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  maxBlogLength: number = 2000;

  constructor(public translations: Translations) {

  }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        if (key == 'description')
          this.form.addControl(key, new FormControl(value, [EditorValidators.required(), EditorValidators.maxLength(this.maxBlogLength)]));
        else if (key == 'coverPhoto')
        this.form.addControl(key, new FormControl(value, [Validators.required]));
        else
          this.form.addControl(key, new FormControl(value, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]));
      } else {
        this.form.controls[key].setValue(value);
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
