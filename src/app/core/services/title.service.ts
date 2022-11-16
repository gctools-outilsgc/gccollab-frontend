import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class TitleService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    // TODO: Translations for titles
    if (title !== undefined) {
      this.title.setTitle(`GCcollab - ${title}`);
    }
  }
}
