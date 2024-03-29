import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '../../models/group';
import { Translations } from 'src/app/core/services/translations.service';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { ICardComponent } from 'src/app/core/interfaces/card-component.interface';
import { CardSize } from 'src/app/shared/models/card-size';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardComponent implements ICardComponent {
  @Input() model?: Group;
  @Input() cardSize: CardSize = CardSize.Small;
  @Input() loading: boolean = false;

  routes = CoreRoutes;

  constructor(
    public translations: Translations,
    private router: Router
  ) {}

  clickEvent() {
    if (this.model) {
      this.router.navigateByUrl(CoreRoutes.Groups + '/' + this.model.id);
    }
  }
}
