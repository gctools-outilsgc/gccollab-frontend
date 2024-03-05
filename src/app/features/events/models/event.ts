import { Person } from "src/app/core/models/person.model";
import { Location } from "src/app/core/models/location.model";
import { Group } from "../../groups/models/group";
import { IEventForm } from "src/app/shared/components/event-form/event-form.component";

export class Event {
    id: string = '-1';
    title: string = '';
    eventType: string = 'Hybrid';
    description: string = '';
    location: Location = new Location('', '', '');
    language: string = 'English';
    tags: [string] = [''];
    startDate: Date = new Date();
    endDate: Date = new Date();
    author: Person | undefined;
    authoredDate: Date | undefined;
    canceled: boolean = false;
    image: string | undefined;
    group: Group | undefined;
    displayPicture: string | undefined;
    organizer: string = '';
    onlinePlatform: string = '';
    duration: string = 'Single';
    
    confirmed: boolean = false;
    declined: boolean = false;

    toEventForm(): IEventForm {
        const eventForm: IEventForm = {
            eventType: this.eventType,
            eventOrganizerName: this.organizer,
            eventName: this.title,
            eventLanguage: this.language,
            eventDescription: this.description,
            eventLocation: this.location.toString(),
            eventOnlinePlatform: this.onlinePlatform,
            eventDuration: this.duration,
            eventStartDate: this.eventFormDateString(this.startDate),
            eventStartTime: this.eventFormTimeString(this.startDate),
            eventEndDate: this.eventFormDateString(this.endDate),
            eventEndTime: this.eventFormTimeString(this.endDate),
        };
        return eventForm;
    }

    private eventFormDateString(date: Date): string {
        return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }

    private eventFormTimeString(date: Date): string {
        return date.getHours().toString() + ':' + date.getMinutes().toString();
    }
}