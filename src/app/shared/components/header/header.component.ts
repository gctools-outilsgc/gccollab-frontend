import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';
import { MaterialButtonType } from '../../models/material-button-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  routes = CoreRoutes;
  materialButtonType = MaterialButtonType;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public translations: Translations) {}

}
