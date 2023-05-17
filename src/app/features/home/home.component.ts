import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { NewsItem } from '../news-feed/models/news-item';
import { Person } from 'src/app/core/models/person';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputType = InputType.Password;

  newsItem: NewsItem = new NewsItem();

  constructor(public translations: Translations) { }

  ngOnInit(): void {
    this.newsItem.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    this.newsItem.author = new Person();
    this.newsItem.author.firstName = 'Shea';
    this.newsItem.author.lastName = 'Dougherty-Gill';
    this.newsItem.author.jobTitle = 'Web Developer';
  }

}
