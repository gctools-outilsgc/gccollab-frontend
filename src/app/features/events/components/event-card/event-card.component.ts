import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../models/event';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';
import { ICardComponent } from 'src/app/core/interfaces/card-component.interface';
import { CardSize } from 'src/app/shared/models/card-size';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent implements ICardComponent {
  @Input({required: true}) model!: Event;
  @Input() loading: boolean = false;
  @Input() cardSize: CardSize | string = CardSize.Small;
  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  routes = CoreRoutes;

  confirmEventCallback: () => unknown = this.confirmEvent.bind(this);
  declineEventCallback: () => unknown = this.declineEvent.bind(this);

  constructor(
    public translations: Translations,
    private router: Router
  ) {}

  confirmEvent() {
    if (this.model) {
      this.model.confirmed = !this.model.confirmed;

      if (this.model.confirmed && this.model.declined) this.model.declined = false;

      if (this.model.confirmed) this.confirm.emit(this.model);
    }
  }

  declineEvent() {
    if (this.model) {
      this.model.declined = !this.model.declined;

      if (this.model.declined && this.model.confirmed) this.model.confirmed = false;

      if (this.model.declined) this.decline.emit(this.model);
    }
  }

  clickEvent() {
    if (this.model) this.router.navigateByUrl(CoreRoutes.Events + '/' + this.model.id);
  }

  isPast(): boolean {
    if (this.model?.startDate && this.model.startDate < new Date()) return true;

    return false;
  }
}
