import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CoreRoutes } from '../../constants/routes.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

  routes = CoreRoutes;

  constructor() { }

  ngOnInit(): void {
  }

}
