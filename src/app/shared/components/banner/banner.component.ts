import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']

})

export class BannerComponent {

  @Input() headerExpanded: boolean = false;
  @Input() textTop: string = '';
  @Input() textBottom: string = '';
  @Input() imgUrl: string = '../../../../assets/svg/banner.svg';
  
  constructor(public translations: Translations) {}

}
