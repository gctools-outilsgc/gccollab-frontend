import { Component, Input } from '@angular/core';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';


@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  @Input() loading: boolean = false;
  @Input() editing: boolean = false;

  materialButtonType = MaterialButtonType;

  constructor(public translations: Translations) {}

}
