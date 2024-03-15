import { Event } from 'src/app/features/events/models/event';

export interface ICalendarDate {
  date: Date;
  events: Event[];
}
