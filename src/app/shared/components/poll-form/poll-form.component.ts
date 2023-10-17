import { Component, Input, OnInit } from '@angular/core';
import { TooltipDirection } from '../../models/tooltip-direction';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {
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
  errorStateMatcher = new MyErrorStateMatcher();
  
  ngOnInit(): void {
    if (Object.keys(this.form.controls).length === 0) {
      this.form.addControl(
        'description', 
        new FormControl(
          this.model.description,
          [
            Validators.required,
            Validators.minLength(this.minLength), 
            Validators.maxLength(this.maxLength),
          ]
        )
      );
  
      for (let i = 0; i < this.model.options.length; i++) {
        this.form.addControl(
          'option' + i, 
          new FormControl(this.model.options[i].value, [Validators.required]
        ));
      }
    }
  }

  addOption(): void {
    if (this.model.options.length < this.maxOptions) {
      this.model.options.push({id: this.model.options.length, value: ''});
      this.form.addControl(
        'option' + (this.model.options.length - 1), 
        new FormControl(this.model.options[this.model.options.length - 1].value, [Validators.required])
      );
    }
  }

  removeOption(index: number): void {
    if (this.model.options.length <= 2) 
      return;

    this.form.removeControl('option' + index);
    this.model.options.splice(index, 1);
  }
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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