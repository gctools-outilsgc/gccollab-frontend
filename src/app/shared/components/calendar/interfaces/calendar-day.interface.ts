import { ICalendarEvent } from "./calendar-event.interface";

export interface ICalendarDay {
  date: Date;
  events: ICalendarEvent[];
}