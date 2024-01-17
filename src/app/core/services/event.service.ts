import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';
import { Location } from '../models/location.model';
import { PeopleService } from './people.service';

import { LoremIpsum } from 'lorem-ipsum';
import { GroupService } from './group.service';
import { IListService } from '../interfaces/list-service.interface';
import { EventCardComponent } from 'src/app/features/events/components/event-card/event-card.component';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IListService {

  private id: number = 0;
  private delay: number = 5000;

  private readonly peopleService: PeopleService = inject(PeopleService);
  private readonly groupService: GroupService = inject(GroupService);

  private lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  public events: Event[] = [
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem(),
    this.generateRandomEventItem()
  ];

  public dataType = Event;
  public cardComponent = EventCardComponent;

  constructor() {

  }

  get(id: string | null, delay: number = this.delay): Observable<Event> {
    let response: Event;

    for(let i = 0; i < this.events.length; i++) {
      if (this.events[i].id == id) {
        response = this.events[i];
        break;
      }
    }

    let observable: Observable<Event> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  getMany(count: number = 10, delay: number = this.delay): Observable<Event[]> {

    let observable: Observable<Event[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.events.slice(0, count > this.events.length ? this.events.length : count));
        subscriber.complete();
      }, delay);
    });

    return observable;
  }

  private generateRandomEventItem(): Event {
    const event = new Event();

    event.id = this.id.toString();
    event.title = this.randomTitle();
    event.eventType = this.randomEventType();
    event.description = this.randomEventDescription();
    event.location = this.randomLocation();
    event.author = this.peopleService.people[this.id];
    event.group = this.groupService.groups[this.id];
    event.startDate = this.randomDate();
    event.endDate = this.randomDate();
    event.image = this.randomImage();
    event.displayPicture = this.randomDisplayPicture();
    event.organizer = this.randomOrganizer();

    this.id++;
    
    return event;
  }

  private randomTitle(): string {
    const titles: string[] = [
      'Drink Outside the Box',
      'Grillin\' n Chillin\'',
      'Chili Cook Off',
      'Hot Dog Eating Contest',
      'Apple Bobbing for Justice',
      'Shawarma Grand Tour',
      'Belly Flop Olympics',
      'Mens Wet T-Shirt Competition'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private randomEventDescription(): string {
    let description: string = '';
    let paragraphs = (Math.random() * 4) + 1;

    for (let i = 0; i < paragraphs; i++) {
      description += this.lorem.generateSentences(Math.floor(Math.random() * 10) + 4);

      if (i != paragraphs - 1)
        description += '<br/><br/>';
    }

    return description;
  }

  private randomEventType(): string {
    const eventTypes: string[] = [
      'In Person',
      'Workshop',
      'Conference',
      'Roundtable',
      'Charity Event'
    ];
    return eventTypes[Math.floor(Math.random() * eventTypes.length)];
  }

  private randomDate() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    let endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  }

  private randomLocation(): Location {
    const addresses: Location[] = [
      new Location('2910 Woodroffe Ave', 'Ottawa', 'Ontario'),
      new Location('4230 Innes Rd', 'Ottawa', 'Ontario'),
      new Location('2440 Bank St', 'Ottawa', 'Ontario'),
      new Location('464 Rideau St', 'Ottawa', 'Ontario'),
      new Location('464 Bank St', 'Ottawa', 'Ontario')
    ];
    return addresses[Math.floor(Math.random() * addresses.length)];
  }

  private randomImage() {
    const images: string[] = [
      '../assets/image/group-banner.png'
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  private randomDisplayPicture(): string {
    const urls: string[] = [
        'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
        'https://images.unsplash.com/photo-1593871075120-982e042088d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
        'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80',
        'https://images.unsplash.com/photo-1556997685-309989c1aa82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVubnklMjBhbmltYWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60',
        'https://images.unsplash.com/photo-1522435229388-6f7a422cd95b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1636370395847-e0781efa45e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
        'https://images.unsplash.com/photo-1587920149371-ac728dd20da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1872&q=80',
        'https://images.unsplash.com/photo-1597237154674-1a0d2274cef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        'https://images.unsplash.com/photo-1504006833117-8886a355efbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1546807742-e44ac98e1e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      ];
      return urls[Math.floor(Math.random() * urls.length)];
    }

  private randomOrganizer(): string {
    const organizers: string[] = [
      'TBS',
      'ESDC',
      'CRA',
      'SSC',
      'NRCC'
    ];
    return organizers[Math.floor(Math.random() * organizers.length)];
  }
}
