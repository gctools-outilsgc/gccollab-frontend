import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() headerToggleEvent = new EventEmitter<boolean>();
  @Input() activeRoute: string = CoreRoutes.Home;

  routes = CoreRoutes;
  materialButtonType = MaterialButtonType;
  headerExpanded = false;

  constructor(public translations: Translations) 
  { }

  toggleSearch () {
    this.headerExpanded = !this.headerExpanded;
    this.headerToggleEvent.emit(this.headerExpanded);
  }

}
