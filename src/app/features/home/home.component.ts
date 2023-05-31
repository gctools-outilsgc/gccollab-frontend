import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { NewsItem } from '../news-feed/models/news-item';
import { NewsService } from 'src/app/core/services/news.service';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../events/models/event';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputType = InputType.Password;

  newsItems: NewsItem[] = [];
  newsPage: number = 1;
  loadingNews: boolean = true;

  event: Event | undefined; // remove

  constructor(public translations: Translations, private newsService: NewsService) {
    this.event = new Event();
    this.event.startDate = new Date();
    this.event.title = "Web Accessibility";
    this.event.eventType = "Roundtable";
   }

  ngOnInit(): void {
    this.newsService.getNews(this.newsPage).subscribe((newsItems: NewsItem[]) => {
      this.newsItems = newsItems;
      this.loadingNews = false;
    });
  }

  onNewsScroll(): void {
    this.loadingNews = true;
    
    this.newsService.getNews(++this.newsPage).subscribe((newsItems: NewsItem[]) => {
      this.newsItems.push(...newsItems);
      this.loadingNews = false;
    });
  }

  confirmEvent(event: Event | undefined) {
    if (this.event) {
      console.log('Event Confirm');
      console.log(event);
    }
  }

  declineEvent(event: Event | undefined) {
    if (this.event) {
      console.log('Event Declined');
      console.log(event);
    }
  }

}
