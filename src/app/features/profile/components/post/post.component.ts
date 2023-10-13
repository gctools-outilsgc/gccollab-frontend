import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/core/models/person.model';
import { INewsItem } from 'src/app/features/news-feed/models/INewsItem';
import { Translations } from 'src/app/core/services/translations.service';
import { FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() profile!: Person;
  @Input() model!: INewsItem; // TODO: Create models for each post type
  @Input() loading: boolean = false;
  @Input() editing: boolean = false;

  formGroups: FormGroup[] = [
    new FormGroup({}),
    new FormGroup({}),
    new FormGroup({}),
    new FormGroup({})
  ];

  submitCallback: Function = this.submit.bind(this);
  selectedForm: FormGroup = this.formGroups[0];

  constructor(public translations: Translations) {
      
  }

  public ngOnInit() {
    
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedForm = this.formGroups[event.index];
  }

  toggleEditing(event: Event) {
    if ((event instanceof KeyboardEvent && (event.key == 'Enter' || event.key == 'Space')) || event instanceof KeyboardEvent == false) 
      this.editing = !this.editing;
  }

  formReady(formGroup: FormGroup): boolean {
    let allControlsValid = true;
    for (const name in formGroup.controls) {
      if (formGroup.controls[name].invalid) {
        allControlsValid = false;
        break;
      }
    }
    return allControlsValid;
  }

  submit(): void {
    console.log(this.profile);
  }

}

