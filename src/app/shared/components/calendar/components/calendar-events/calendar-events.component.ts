import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ICalendarDate } from '../../interfaces/calendar-date.interface';
import { Event } from 'src/app/features/events/models/event';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventsComponent {
  @Input({required: true}) day: ICalendarDate = { date: new Date(), events: [] };

  @Output() eventEdit: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() eventDelete: EventEmitter<Event> = new EventEmitter<Event>();

  isToday = isToday;
  
  constructor() {
    
  }

  editEvent(event: Event) {
    this.eventEdit.emit(event);
  }

  deleteEvent(event: Event) {
    this.eventDelete.emit(event);
  }
}