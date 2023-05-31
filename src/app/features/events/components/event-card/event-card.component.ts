import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../models/event';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent {
  @Input() model?: Event;
  @Input() loading: boolean = false;
  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  routes = CoreRoutes;

  constructor(public translations: Translations,
              private router: Router) 
  {  }

  confirmEvent() {
    this.confirm.emit(this.model);
  }

  declineEvent() {
    this.decline.emit(this.model);
  }

  clickEvent() {
    if (this.model) {
      this.router.navigateByUrl(CoreRoutes.Events + '/' + this.model.id);
    }
  }
}
