import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TooltipDirection } from '../../models/tooltip-direction';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { Validators as EditorValidators } from 'ngx-editor';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: IPollForm = {
    description: '',
    options: [
      { id: 0, value: '' },
      { id: 1, value: '' }
    ],
    photo: ''
  }

  maxOptions: number = 10;
  minLength: number = 1;
  maxLength: number = 240;
  tooltipDirection = TooltipDirection;
  
  constructor(public translations: Translations) {

  }
  
  ngOnInit(): void {
    this.form.addControl(
      'description', 
      new FormControl(
        this.model.description,
        [
          EditorValidators.required(),
          EditorValidators.maxLength(this.maxLength),
        ]
      )
    );

    for (let i = 0; i < this.model.options.length; i++) {
      this.form.addControl(
        'option' + i, 
        new FormControl(this.model.options[i].value, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ));
    }
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  addOption(): void {
    if (this.model.options.length < this.maxOptions) {
      this.model.options.push({id: this.model.options[this.model.options.length - 1].id + 1, value: ''});
      this.form.addControl(
        'option' + this.model.options[this.model.options.length - 1].id, 
        new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      );
    }
  }

  removeOption(option: IPollOption): void {
    if (this.model.options.length <= 2) 
      return;

    this.form.removeControl('option' + option.id);

    for (let i = 0; i < this.model.options.length; i++) {
      if (this.model.options[i].id == option.id) {
        this.model.options.splice(i, 1);
        break;
      }
    }
  }
}

export interface IPollForm {
  description: string;
  options: IPollOption[];
  photo: string;
}

export interface IPollOption {
  id: number,
  value: string
}