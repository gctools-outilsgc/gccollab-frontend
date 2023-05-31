import { Person } from "src/app/core/models/person";

export class Event {
    id: string | undefined;
    title: string | undefined;
    eventType: string | undefined;
    description: string | undefined;
    location: string | undefined;
    tags: [string] | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    author: Person | undefined;
    authoredDate: Date | undefined;
    
    confirmed: boolean = false;
    declined: boolean = false;
}