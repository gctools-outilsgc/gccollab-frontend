import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

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
}
