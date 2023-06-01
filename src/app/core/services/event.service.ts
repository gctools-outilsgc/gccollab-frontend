import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private id: number = 0;

  constructor() { }

  getEvents(page: number): Observable<Event[]> {
    return this.mockGetEvents(page);
  }

  private mockGetEvents(page: number): Observable<Event[]> {
    let response: Event[] = [];

    for (let i = 0; i < 3; i++) {
      response.push(this.generateRandomEventItem());
    }

    let observable: Observable<Event[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 5000);
    });

    return observable;
  }

  private generateRandomEventItem(): Event {
    const event = new Event();

    event.id = this.id.toString();
    event.title = this.randomTitle();
    event.eventType = this.randomEventType();
    event.startDate = new Date();
    
    return event;
  }

  private randomTitle(): string {
    const titles: string[] = [
      'Drink Outside the Box',
      'Office Bake Sale',
      'Chili Cook Off',
      'Hot Dog Eating Contest',
      'Apple Bobbing for Justice',
      'Shawarma Tour',
      'Haunted Walk',
      'Dragon Boat Race'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private randomEventType(): string {
    const titles: string[] = [
      'In Person',
      'Online via Zoom',
      'Online via Teams',
      'Roundtable'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

}
