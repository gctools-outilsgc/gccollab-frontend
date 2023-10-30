import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';
import { Location } from '../models/location.model';
import { PeopleService } from './people.service';

import { LoremIpsum } from 'lorem-ipsum';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

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

  constructor() {

  }

  mockGetEvent(id: string | null, delay: number = this.delay): Observable<Event> {
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

  mockGetEvents(count: number = 10, delay: number = this.delay): Observable<Event[]> {

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
    let endDate = new Date('2023/12/31');
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

}
