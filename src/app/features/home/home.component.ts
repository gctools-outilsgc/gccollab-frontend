import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { NewsItem } from '../news-feed/models/news-item';
import { NewsService } from 'src/app/core/services/news.service';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../events/models/event';
import { EventService } from 'src/app/core/services/event.service';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Person } from 'src/app/core/models/person';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputType = InputType.Password;
  routes = CoreRoutes;

  // News
  newsItems: NewsItem[] = [];
  newsPage: number = 1;
  loadingNews: boolean = true;

  // Events
  events: Event[] = [];
  eventsPage: number = 1;
  loadingEvents: boolean = true;

  // Profiles
  profile: Person = new Person();

  constructor(public translations: Translations, private newsService: NewsService, private eventService: EventService) {
    this.profile.id = '1';
    this.profile.firstName = 'Shea';
    this.profile.lastName = 'Dougherty-Gill';
    this.profile.jobTitle = 'Web Developer';
    this.profile.profilePicture = 'https://avatars.githubusercontent.com/u/2327968?v=4';
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
