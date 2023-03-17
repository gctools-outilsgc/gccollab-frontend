import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService extends TitleStrategy implements OnDestroy {

  private appTitleSub!: Subscription;
  private titleSub!: Subscription;

  constructor(private translateService: TranslateService,
              private readonly title: Title) {
    super();
  }

  ngOnDestroy(): void {
    if (this.appTitleSub != null) 
      this.appTitleSub.unsubscribe();
      
    if (this.titleSub != null) 
      this.titleSub.unsubscribe();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    let appTitle: string = '';

    this.appTitleSub = this.translateService.get('app.title').subscribe((translatedTitle) => {
      appTitle = translatedTitle;
    });

    if (title) {
      this.titleSub = this.translateService.get(title).subscribe((translatedTitle) => {
        this.title.setTitle(appTitle + ' - ' + translatedTitle);
      })
    } else {
      this.title.setTitle(appTitle);
    }
  }
}
