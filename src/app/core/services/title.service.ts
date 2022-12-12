import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { CoreModule } from '../core.module';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: CoreModule
})
export class TitleService extends TitleStrategy {

  constructor(private translateService: TranslateService,
              private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    let appTitle: string = '';

    this.translateService.get('APP.TITLE').subscribe((translatedTitle) => {
      appTitle = translatedTitle;
    });

    if (title) {
      this.translateService.get(title).subscribe((translatedTitle) => {
        this.title.setTitle(appTitle + ' - ' + translatedTitle);
      })
    } else {
      this.title.setTitle(appTitle);
    }
  }
}
