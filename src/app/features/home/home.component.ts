import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { NewsItem } from '../news-feed/models/news-item';
import { NewsService } from 'src/app/core/services/news.service';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../events/models/event';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputType = InputType.Password;

  // News
  newsItems: NewsItem[] = [];
  newsPage: number = 1;
  loadingNews: boolean = true;

  // Events
  events: Event[] = [];
  eventsPage: number = 1;
  loadingEvents: boolean = true;

  constructor(public translations: Translations, private newsService: NewsService, private eventService: EventService) {

   }

  ngOnInit(): void {
    this.newsService.getNews(this.newsPage).subscribe((newsItems: NewsItem[]) => {
      this.newsItems = newsItems;
      this.loadingNews = false;
    });

    this.eventService.getEvents(this.eventsPage).subscribe((events: Event[]) => {
      this.events = events;
      this.loadingEvents = false;
    });
  }

  onNewsScroll(): void {
    this.loadingNews = true;
    
    this.newsService.getNews(++this.newsPage).subscribe((newsItems: NewsItem[]) => {
      this.newsItems.push(...newsItems);
      this.loadingNews = false;
    });
  }

  confirmEvent() {
    console.log('Event Confirm');
  }

  declineEvent() {
    console.log('Event Declined');
  }

}
