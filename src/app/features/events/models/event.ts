import { Person } from "src/app/core/models/person.model";
import { Location } from "src/app/core/models/location.model";
import { Group } from "../../groups/models/group";
import { ICalendarEvent } from "src/app/shared/components/calendar/interfaces/calendar-event.interface";

export class Event implements ICalendarEvent {
    id: string = "-1";
    title: string = '';
    eventType: string | undefined;
    description: string | undefined;
    location: Location | undefined;
    tags: [string] | undefined;
    startDate: Date = new Date();
    endDate: Date = new Date();
    author: Person | undefined;
    authoredDate: Date | undefined;
    canceled: boolean = false;
    image: string | undefined;
    group: Group | undefined;
    displayPicture: string | undefined;
    organizer: string | undefined;
    color: string = '#6C0DBA';
    
    confirmed: boolean = false;
    declined: boolean = false;
}