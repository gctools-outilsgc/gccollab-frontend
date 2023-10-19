import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() model: IPostForm = {
    description: ''
  }

  minLength: number = 3;
  maxLength: number = 240;

  constructor() {

  }

  ngOnInit(): void {
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
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

export interface IPostForm {
  description: string;
}
