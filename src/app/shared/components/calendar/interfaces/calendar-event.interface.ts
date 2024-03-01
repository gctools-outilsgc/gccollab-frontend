import { Location } from "src/app/core/models/location.model";

export interface ICalendarEvent {
  id: string;
  title: string;
  location: Location;
  eventType: string;
  startDate: Date;
  endDate: Date;
}