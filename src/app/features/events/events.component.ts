import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from './models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  routes = CoreRoutes;
  form: FormGroup = new FormGroup({});
  searchIcon: string = 'fa-solid fa-magnifying-glass';
  eventsPage: number = 1;
  loadingEvents: boolean = true;
  materialButtonType = MaterialButtonType;

  currentDate = new Date();

  upcomingEvents: Event[] = [
    new Event('Drink Outside the Box', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1)), // Tomorrow
    new Event('Grillin n Chillin', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 3)), // Three days from now
  ];
  
  previousEvents: Event[] = [
    new Event('Chili Cook Off', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1)), // Yesterday
    new Event('Hot Dog Eating Competition', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 3)), // Three days in the past
  ];
  constructor(
    public translations: Translations,
    public eventService: EventService
  ) {}

  ngOnInit(): void {
    this.form.addControl('eventSearchBar', new FormControl('', []));
  }
}
