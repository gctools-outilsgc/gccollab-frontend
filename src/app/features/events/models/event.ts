import { Person } from "src/app/core/models/person.model";
import { Location } from "src/app/core/models/location.model";
import { Group } from "../../groups/models/group";

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
    group: Group | undefined;
    
    confirmed: boolean = false;
    declined: boolean = false;
}