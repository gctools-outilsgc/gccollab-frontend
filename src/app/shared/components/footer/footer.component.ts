import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  routes = CoreRoutes;

  constructor(public translations: Translations) { }

}
