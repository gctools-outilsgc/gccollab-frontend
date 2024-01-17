import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  routes = CoreRoutes;
  form: FormGroup = new FormGroup({});
  searchIcon: string = 'fa-solid fa-magnifying-glass';
  eventsPage: number = 1;
  loadingEvents: boolean = true;
  materialButtonType = MaterialButtonType;

  constructor(public translations: Translations, 
              public eventService: EventService) {}

  ngOnInit(): void {
          this.form.addControl("eventSearchBar", new FormControl("", []));
  }

  filterUpcomingEvents = (event : any) => {
    const currentDate = new Date();
    return event.startDate >= currentDate;
  }

  filterPreviousEvents = (event: any) => {
    const currentDate = new Date();
    return event.startDate < currentDate;
  }
}
