import { Component, Input } from '@angular/core';
import { Person } from 'src/app/core/models/person.model';
import { INewsItem } from 'src/app/features/news-feed/models/INewsItem';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() profile!: Person;
  @Input() model!: INewsItem; // TODO: Create models for each post type
  @Input() loading: boolean = false;

  constructor() {
    
  }

}

