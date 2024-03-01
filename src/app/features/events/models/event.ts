import { Person } from "src/app/core/models/person.model";
import { Location } from "src/app/core/models/location.model";
import { Group } from "../../groups/models/group";
import { ICalendarEvent } from "src/app/shared/components/calendar/interfaces/calendar-event.interface";

export class Event implements ICalendarEvent {
    id: string = '-1';
    title: string = '';
    eventType: string = '';
    description: string = '';
    location: Location = new Location('', '', '');
    tags: [string] = [''];
    startDate: Date = new Date();
    endDate: Date = new Date();
    author: Person | undefined;
    authoredDate: Date | undefined;
    canceled: boolean = false;
    image: string | undefined;
    group: Group | undefined;
    displayPicture: string | undefined;
    organizer: string | undefined;
    
    confirmed: boolean = false;
    declined: boolean = false;
}