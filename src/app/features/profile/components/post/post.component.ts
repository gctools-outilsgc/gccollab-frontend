import { Component, Input } from '@angular/core';
import { Person } from 'src/app/core/models/person';
import { NewsItem } from 'src/app/features/news-feed/models/news-item';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() profile!: Person;
  @Input() model!: NewsItem; // TODO: Create models for each post type
  @Input() loading: boolean = false;

  constructor() {
    
  }

}
