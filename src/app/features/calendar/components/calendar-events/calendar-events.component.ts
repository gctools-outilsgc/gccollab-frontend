import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, IterableDiffers, ChangeDetectorRef, IterableDiffer, DoCheck } from '@angular/core';
import { ICalendarDate } from '../../interfaces/calendar-date.interface';
import { Event } from 'src/app/features/events/models/event';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventsComponent implements DoCheck {
  @Input({ required: true }) calendarDate: ICalendarDate = { date: new Date(), events: [] };

  @Output() eventEdit: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() eventDelete: EventEmitter<Event> = new EventEmitter<Event>();

  isToday = isToday;

  private iterableDifferEvents: IterableDiffer<Event>;

  constructor(
    private iterableDiffers: IterableDiffers,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.iterableDifferEvents = iterableDiffers.find(this.calendarDate.events).create();
  }

  ngDoCheck() {
    if (this.iterableDifferEvents.diff(this.calendarDate.events)) {
      this.changeDetectorRef.markForCheck();
    }
  }

  editEvent(event: Event) {
    this.eventEdit.emit(event);
  }

  deleteEvent(event: Event) {
    this.eventDelete.emit(event);
  }
}
