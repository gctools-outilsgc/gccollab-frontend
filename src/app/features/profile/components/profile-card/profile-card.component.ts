import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { Person } from 'src/app/core/models/person';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from 'src/app/shared/models/material-button-type';
import { TooltipDirection } from 'src/app/shared/models/tooltip-direction';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  @Input() model?: Person;
  @Input() loading: boolean = false;

  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  materialButtonType = MaterialButtonType;
  tooltipDirection = TooltipDirection;
  routes = CoreRoutes;

  confirmed: boolean = false;
  declined: boolean = false;

  constructor(public translations: Translations, private router: Router) {

  }

  clickConfirm() {
    if (this.model) {
      
      this.confirmed = !this.confirmed;

      if (this.confirmed && this.declined)
        this.declined = false;

      this.confirm.emit(this.model);
    }
  }

  clickDecline() {
    if (this.model) {

      this.declined = !this.declined;
      
      if (this.declined && this.confirmed)
        this.confirmed = false;

      this.decline.emit(this.model);
    }
  }

  clickProfile() {
    if (this.model) {
      this.router.navigateByUrl(CoreRoutes.Profile + '/' + this.model.id);
    }
  }
}
