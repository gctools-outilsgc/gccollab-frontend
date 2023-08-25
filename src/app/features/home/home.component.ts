import { Component, OnInit } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { NewsItem } from '../news-feed/models/news-item';
import { NewsService } from 'src/app/core/services/news.service';
import { Event } from '../events/models/event';
import { EventService } from 'src/app/core/services/event.service';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Person } from 'src/app/core/models/person';
import { PeopleService } from 'src/app/core/services/people.service';
import { Group } from '../groups/models/group';
import { GroupService } from 'src/app/core/services/group.service';
import { Banner } from 'src/app/shared/components/banner/banner.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  banner: Banner = new Banner('../../../assets/svg/banner.svg', this.translations.banner.welcome, this.translations.banner.gccollab);

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

  // Connections
  people: Person[] = [];
  peoplePage: number = 1;
  loadingPeople: boolean = true;

  // Groups
  groups: Group[] = [];
  groupsPage: number = 1;
  loadingGroups: boolean = true;

  constructor(public translations: Translations, 
              private newsService: NewsService, 
              private eventService: EventService, 
              private peopleService: PeopleService,
              private groupService: GroupService) {

  }

  ngOnInit(): void {
    this.newsService.mockGetNewsItems(10, 5000).subscribe((newsItems: NewsItem[]) => {
      this.newsItems = newsItems;
      this.loadingNews = false;
    });

    this.eventService.mockGetEvents(3, 5000).subscribe((events: Event[]) => {
      this.events = events;
      this.loadingEvents = false;
    });

    this.peopleService.mockGetPeople(3, 5000).subscribe((people: Person[]) => {
      this.people = people;
      this.loadingPeople = false;
    });

    this.groupService.mockGetGroups(3, 5000).subscribe((groups: Group[]) => {
      this.groups = groups;
      this.loadingGroups = false;
    });
  }

  onNewsScroll(): void {
    this.loadingNews = true;
    
    this.newsService.mockGetNewsItems(10, 3000).subscribe((newsItems: NewsItem[]) => {
      this.newsItems.push(...newsItems);
      this.loadingNews = false;
    });
  }

  confirmEvent(event: Event) {
    console.log('Event Confirm');
    console.log(event);
  }

  confirmConnection(person: Person) {
    console.log('Connection Confirmed');
    console.log(person);
  }

  declineEvent(event: Event) {
    console.log('Event Declined');
    console.log(event);
  }

  declineConnection(person: Person) {
    console.log('Connection Declined');
    console.log(person);
  }

}
