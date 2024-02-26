import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { EventService } from 'src/app/core/services/event.service';
import { Event } from './models/event';
import { Location } from 'src/app/core/models/location.model';

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
    new Event(
      '1',
      'Drink Outside the Box',
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1),
      'TBS',
      new Location('2910 Woodroffe Ave', 'Ottawa', 'Ontario')
    ), // Tomorrow
    new Event(
      '2',
      'Grillin n Chillin',
      'https://images.unsplash.com/photo-1593871075120-982e042088d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 3),
      'ESDC',
      new Location('4230 Innes Rd', 'Ottawa', 'Ontario')
    ), // Three days from now
  ];

  previousEvents: Event[] = [
    new Event(
      '1',
      'Chili Cook Off',
      'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80',
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1),
      'CRA',
      new Location('2440 Bank St', 'Ottawa', 'Ontario')
    ), // Yesterday
    new Event(
      '2',
      'Hot Dog Eating Competition',
      'https://images.unsplash.com/photo-1556997685-309989c1aa82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVubnklMjBhbmltYWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60',
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 3),
      'SSC',
      new Location('464 Bank St', 'Ottawa', 'Ontario')
    ), // Three days in the past
  ];

  constructor(
    public translations: Translations,
    public eventService: EventService
  ) {}

  ngOnInit(): void {
    this.form.addControl('eventSearchBar', new FormControl('', []));
  }
}
