import { Person } from "src/app/core/models/person.model";
import { Location } from "src/app/core/models/location.model";
import { Group } from "../../groups/models/group";
import { IEventForm } from "src/app/shared/components/event-form/event-form.component";
import { format, isSameDay } from 'date-fns';


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
    onlinePlatform: string = 'Teams';
    duration: string = 'Single';
    
    confirmed: boolean = false;
    declined: boolean = false;

    // TODO: Make these the same properties? Implement the interface?
    toEventForm(): IEventForm {
        const sameDay = isSameDay(this.startDate, this.endDate);
        const eventForm: IEventForm = {
            eventType: this.eventType,
            eventOrganizerName: this.organizer,
            eventName: this.title,
            eventLanguage: this.language,
            eventDescription: this.description,
            eventLocation: this.location.toString(),
            eventOnlinePlatform: this.onlinePlatform,
            eventDuration: sameDay ? 'Single' : 'Multi',
            eventStartDate: format(this.startDate, 'y-MM-dd'),
            eventStartTime: format(this.startDate, 'HH:mm'),
            eventEndDate: format(this.endDate, 'y-MM-dd'),
            eventEndTime: format(this.endDate, 'HH:mm'),
        };
        return eventForm;
    }

    fromEventForm(eventForm: IEventForm): Event {
        const event = new Event();

        event.id = this.id;
        event.title = eventForm.eventName;
        event.eventType = eventForm.eventType;
        event.description = eventForm.eventDescription;

        const addCityProv = eventForm.eventLocation.split(',');
        event.location = new Location(addCityProv[0].trim(), addCityProv[1].trim(), addCityProv[2].trim());

        event.language = eventForm.eventLanguage;
        event.tags = this.tags;
        event.startDate = new Date([eventForm.eventStartDate, eventForm.eventStartTime].join(' '));
        event.endDate = new Date([eventForm.eventEndDate, eventForm.eventEndTime].join(' '));
        event.author = this.author;
        event.authoredDate = this.authoredDate;
        event.canceled = this.canceled;
        event.image = this.image;
        event.group = this.group;
        event.displayPicture = this.displayPicture;
        event.organizer = eventForm.eventOrganizerName;
        event.onlinePlatform = eventForm.eventOnlinePlatform;
        event.duration = eventForm.eventDuration;
        event.confirmed = this.confirmed;
        event.declined = this.declined;
        
        return event;
    }

}