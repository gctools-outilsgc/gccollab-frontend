import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

  routes = CoreRoutes;

  constructor(public translations: Translations) { }

  ngOnInit(): void {
  }

}
