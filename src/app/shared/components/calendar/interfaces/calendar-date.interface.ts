import { ICalendarEvent } from "./calendar-event.interface";

export interface ICalendarDate {
  date: Date;
  events: ICalendarEvent[];
}