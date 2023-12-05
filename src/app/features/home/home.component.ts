import { Component, OnInit } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';
import { InputType } from 'src/app/shared/models/input-type';

import { INewsItem } from '../news-feed/models/INewsItem';
import { NewsService } from 'src/app/core/services/news.service';
import { Event } from '../events/models/event';
import { EventService } from 'src/app/core/services/event.service';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Person } from 'src/app/core/models/person.model';
import { PeopleService } from 'src/app/core/services/people.service';
import { Group } from '../groups/models/group';
import { GroupService } from 'src/app/core/services/group.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputType = InputType.Password;
  routes = CoreRoutes;

  // News
  newsItems: INewsItem[] = [];
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

  calEvents: Event[] = [];
  loadingCalendar: boolean = true;

  constructor(public translations: Translations, 
              public newsService: NewsService, 
              public eventService: EventService, 
              public peopleService: PeopleService,
              public groupService: GroupService) {

  }

  ngOnInit(): void {
    this.newsService.getMany(10, 5000).subscribe((newsItems: INewsItem[]) => {
      this.newsItems = newsItems;
      this.loadingNews = false;
    });

    this.eventService.getMany(3, 5000).subscribe((events: Event[]) => {
      this.events = events;
      this.loadingEvents = false;
    });

    this.peopleService.getMany(3, 5000).subscribe((people: Person[]) => {
      this.people = people;
      this.loadingPeople = false;
    });

    this.groupService.getMany(3, 5000).subscribe((groups: Group[]) => {
      this.groups = groups;
      this.loadingGroups = false;
    });

    this.eventService.getMany(10, 5000).subscribe((events: Event[]) => {
      this.calEvents = events;
      this.loadingCalendar = false;
    });
  }

  onNewsScroll(): void {
    this.loadingNews = true;
    
    this.newsService.getMany(10, 3000).subscribe((newsItems: INewsItem[]) => {
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
