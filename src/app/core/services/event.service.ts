import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private id: number = 0;

  constructor() { }

  mockGetEvents(count: number = 10, delay: number = 5000): Observable<Event[]> {
    let response: Event[] = [];

    for (let i = 0; i < count; i++) {
      response.push(this.generateRandomEventItem());
    }

    let observable: Observable<Event[]> = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
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
    event.startDate = this.randomDate();

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

  private randomEventType(): string {
    const titles: string[] = [
      'In Person',
      'Workshop',
      'Conference',
      'Roundtable',
      'Charity Event'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private randomDate() {
    let startDate = new Date();
    let endDate = new Date('2023/12/31');
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  }

}
