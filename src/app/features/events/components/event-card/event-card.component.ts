import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../../models/event';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent {
  @Input() model?: Event;
  @Input() loading: boolean = false;

  bookmarked: boolean = false;
  declined: boolean = false;

  materialButtonType = MaterialButtonType;

  constructor(public translations: Translations) {}
}
