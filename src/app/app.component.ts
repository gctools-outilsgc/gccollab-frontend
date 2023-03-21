import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent }from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CoreRoutes } from './core/models/routes';

import { OidcSecurityService, PublicEventsService, EventTypes } from 'angular-auth-oidc-client';
import { SessionStorageService } from './core/services/session-storage.service';

import { TranslateService } from "@ngx-translate/core";
import { LanguageStorageService } from './core/services/language-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  showHeaderFooter: boolean = true;
  private checkAuthSub!: Subscription;
  private authReturnSub!: Subscription;
  private langChangeSub!: Subscription;
  private routeChangeSub!: Subscription;

  constructor(public oidcSecurityService: OidcSecurityService, 
              private translateService: TranslateService,
              private languageStorageService: LanguageStorageService,
              private router: Router,
              private eventService: PublicEventsService,
              private sessionStorageService: SessionStorageService) {

  }

  ngOnInit() {
    this.initAuthService();
    this.initTranslationService();
    this.initRouteChangeSubscription();
  }

  ngOnDestroy(): void {
    if (this.checkAuthSub != null)
      this.checkAuthSub.unsubscribe();

    if (this.authReturnSub != null)
      this.authReturnSub.unsubscribe();

    if (this.langChangeSub != null)
      this.langChangeSub.unsubscribe();

    if (this.routeChangeSub != null)
      this.routeChangeSub.unsubscribe();
  }

  initAuthService(): void {

    this.authReturnSub = this.eventService.registerForEvents()
    .pipe(filter((notification) => notification.type == EventTypes.NewAuthenticationResult))
    .subscribe((value:any) => {

      if (value["value"]["isRenewProcess"] === false &&
          value["value"]["isAuthenticated"] === true) {

        let retUrl = this.sessionStorageService.read('gccollab-retUrl');

        if (retUrl) {
          window.location.replace(retUrl);
          this.sessionStorageService.remove('gccollab-retUrl');
        }
      } else {
        this.router.navigateByUrl('/');
      }
    });
    
    this.checkAuthSub = this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log("Authenticated: " + isAuthenticated);
      console.log("User Data: " + userData);
      console.log("Access Token: " + accessToken);
      console.log("ID Token: " + idToken);

      if (isAuthenticated !== true) {
        this.sessionStorageService.write('gccollab-retUrl', window.location.href);
        this.login();
      }
    });
  }

  initTranslationService(): void {
    this.langChangeSub = this.translateService.onLangChange.subscribe(({lang, translations}) => {
      this.languageStorageService.setLanguage(lang);
    });

    let savedLang = this.languageStorageService.getLanguage();

    if (savedLang !== null && (savedLang == 'en' || 'fr')) {
      this.translateService.setDefaultLang(savedLang);
      this.translateService.use(savedLang);
    }
    else {
      let browserLang = this.translateService.getBrowserLang();

      if (browserLang && (browserLang == 'en' || 'fr')) {
        this.translateService.setDefaultLang(browserLang);
        this.translateService.use(browserLang);
      }
    }
  }

  initRouteChangeSubscription(): void {
    this.routeChangeSub = this.router.events.pipe(filter(e => e instanceof NavigationStart ||  e instanceof NavigationEnd)).subscribe((e) => { 
      if ((e as RouterEvent).url === '/' + CoreRoutes.Splash) {
        return this.showHeaderFooter = false;
      }
      return this.showHeaderFooter = true;
     });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
