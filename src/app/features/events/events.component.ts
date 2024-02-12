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
    new Event('1', 'Event 1', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 1)), // Tomorrow
    new Event('2', 'Event 2', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 3)), // Three days from now
    new Event('3', 'Event 3', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7)), // One week from now
    new Event('4', 'Event 4', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 10)), // Ten days from now
  ];
  
  // Define previous 
  previousEvents: Event[] = [
    new Event('1', 'Event 1', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1)), // Yesterday
    new Event('2', 'Event 2', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 3)), // Three days behind now
    new Event('3', 'Event 3', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 7)), // One week from now in the past
    new Event('4', 'Event 4', new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 10)), // Ten days from now in the past
  ];
  constructor(
    public translations: Translations,
    public eventService: EventService
  ) {}

  ngOnInit(): void {
    this.form.addControl('eventSearchBar', new FormControl('', []));
    const currentDate = new Date()
    this.eventService.getMany().subscribe((events: Event[]) => {
    this.upcomingEvents = events.filter(event => event.startDate && new Date(event.startDate) >= currentDate);
    this.previousEvents = events.filter(event => event.startDate && new Date(event.startDate) < currentDate);
  });
  }
}
