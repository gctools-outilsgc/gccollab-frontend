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
  profileShea: Person = new Person();
  profileAdi: Person = new Person();

  constructor(public translations: Translations, private newsService: NewsService, private eventService: EventService) {
    this.profileShea.id = '1';
    this.profileShea.firstName = 'Shea';
    this.profileShea.lastName = 'Dougherty-Gill';
    this.profileShea.jobTitle = 'Web Developer';
    this.profileShea.profilePicture = 'https://media.tenor.com/0ygiqFaX-ssAAAAM/bongo-cat-typing.gif';

    this.profileAdi.id = '2';
    this.profileAdi.firstName = 'Adi';
    this.profileAdi.lastName = 'Makkar';
    this.profileAdi.jobTitle = 'Web Developer';
    this.profileAdi.profilePicture = 'https://i.gifer.com/KWZg.gif';
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
