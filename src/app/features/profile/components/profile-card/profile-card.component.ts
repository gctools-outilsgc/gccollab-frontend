import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { ICardComponent } from 'src/app/core/interfaces/card-component.interface';
import { Person } from 'src/app/core/models/person.model';
import { Translations } from 'src/app/core/services/translations.service';
import { CardSize } from 'src/app/shared/models/card-size';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent implements ICardComponent {
  @Input() model?: Person;
  @Input() cardSize: CardSize = CardSize.Small;
  @Input() loading: boolean = false;

  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  routes = CoreRoutes;

  confirmed: boolean = false;
  declined: boolean = false;

  constructor(
    public translations: Translations,
    private router: Router
  ) {}

  clickConfirm() {
    if (this.model) {
      this.confirmed = !this.confirmed;

      if (this.confirmed && this.declined) this.declined = false;

      if (this.confirmed) this.confirm.emit(this.model);
    }
  }

  clickDecline() {
    if (this.model) {
      this.declined = !this.declined;

      if (this.declined && this.confirmed) this.confirmed = false;

      if (this.declined) this.decline.emit(this.model);
    }
  }

  clickProfile() {
    if (this.model) {
      this.router.navigateByUrl(CoreRoutes.Profile + '/' + this.model.id);
    }
  }
}
