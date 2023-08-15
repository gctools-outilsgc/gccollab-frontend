import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from 'src/app/core/services/translations.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']

})

export class BannerComponent {

  @Input() model: Banner | undefined;
  @Input() headerExpanded: boolean = false;
  
  constructor(public translations: Translations) {}

}

export class Banner {

  textTop: string;
  textBottom: string;
  backgroundImage: string = '../../../../assets/svg/banner.svg';

  constructor(backgroundImage: string, textTop: string = '', textBottom: string = '') {
    this.backgroundImage = backgroundImage;
    this.textTop = textTop;
    this.textBottom = textBottom;
  }
}