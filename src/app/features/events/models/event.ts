import { Person } from 'src/app/core/models/person.model';
import { Location } from 'src/app/core/models/location.model';
import { Group } from '../../groups/models/group';

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
  displayPicture: string | undefined;
  organizer: string | undefined;

  confirmed: boolean = false;
  declined: boolean = false;

  constructor(id: string, title: string, startDate: Date) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
  }
}
