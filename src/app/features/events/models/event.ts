import { Person } from "src/app/core/models/person";
import { Location } from "src/app/core/models/location";

export class Event {
    id: string | undefined;
    title: string | undefined;
    eventType: string | undefined;
    description: string | undefined;
    location: Location | undefined;
    tags: [string] | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    author: Person | undefined;
    authoredDate: Date | undefined;
    canceled: boolean = false;
    image: string | undefined;
    
    confirmed: boolean = false;
    declined: boolean = false;
}