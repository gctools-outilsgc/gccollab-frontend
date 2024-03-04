import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ICalendarDate } from '../../interfaces/calendar-date.interface';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventsComponent implements OnInit {
  @Input({required: true}) day: ICalendarDate = { date: new Date(), events: [] };

  @Output() eventDelete: EventEmitter<ICalendarEvent> = new EventEmitter<ICalendarEvent>();
  
  constructor() {
    
  }

  ngOnInit() {
    console.log(this.day)
  }

  deleteEvent(event: ICalendarEvent) {
    this.eventDelete.emit(event);
  }
}