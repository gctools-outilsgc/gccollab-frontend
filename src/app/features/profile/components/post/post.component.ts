import { Component, Input } from '@angular/core';
import { Person } from 'src/app/core/models/person.model';
import { INewsItem } from 'src/app/features/news-feed/models/INewsItem';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() profile!: Person;
  @Input() model!: INewsItem; // TODO: Create models for each post type
  @Input() loading: boolean = false;
  @Input() editing: boolean = false;

  constructor(public translations: Translations) {
      
  }

  toggleEditing(event: Event) {
    if ((event instanceof KeyboardEvent && (event.key == 'Enter' || event.key == 'Space')) || event instanceof KeyboardEvent == false) 
      this.editing = !this.editing;
  }

  formReady(): boolean {
    return true;
  }

}

