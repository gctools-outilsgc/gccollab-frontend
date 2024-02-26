import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: IPostForm = {
    description: '',
  };

  minLength: number = 3;
  maxLength: number = 240;

  constructor(public translations: Translations) {}

  ngOnInit(): void {
    this.form.addControl('description', new FormControl(this.model.description, [Validators.required(), Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]));
  }

  ngOnDestroy(): void {
    this.form.reset();
  }
}

export interface IPostForm {
  description: string;
}
