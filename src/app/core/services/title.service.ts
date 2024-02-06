import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends TitleStrategy implements OnDestroy {
  private appTitleSub!: Subscription;
  private titleSub!: Subscription;
  private appTitle!: string;

  constructor(
    private translateService: TranslateService,
    private readonly title: Title
  ) {
    super();

    this.appTitleSub = this.translateService.get('app.title').subscribe(translatedTitle => {
      this.appTitle = translatedTitle;
    });
  }

  ngOnDestroy(): void {
    if (this.appTitleSub != null) this.appTitleSub.unsubscribe();

    if (this.titleSub != null) this.titleSub.unsubscribe();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title) {
      this.titleSub = this.translateService.get(title).subscribe(translatedTitle => {
        this.title.setTitle(this.appTitle + ' - ' + translatedTitle);
      });
    } else {
      this.title.setTitle(this.appTitle);
    }
  }
}
