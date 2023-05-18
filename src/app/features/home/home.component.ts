import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { NewsItem } from '../news-feed/models/news-item';
import { Person } from 'src/app/core/models/person';
import { NewsService } from 'src/app/core/services/news.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputType = InputType.Password;

  newsItems$?: Observable<NewsItem[]>;
  newsPage: number = 1;

  constructor(public translations: Translations, private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsItems$ = this.newsService.getNews(this.newsPage);
  }

}
