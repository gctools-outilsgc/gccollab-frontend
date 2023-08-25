import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent }from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CoreRoutes } from './core/constants/routes.constants';

import { OidcSecurityService } from 'angular-auth-oidc-client';

import { TranslateService } from "@ngx-translate/core";
import { LanguageStorageService } from './core/services/language-storage.service';
import { Translations } from './core/services/translations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  showHeaderFooter: boolean = true;
  showSearchBar: boolean = false;
  activeRoute: string = CoreRoutes.Home;

  private checkAuthSub!: Subscription;
  private langChangeSub!: Subscription;
  private routeChangeSub!: Subscription;
  
  constructor(public oidcSecurityService: OidcSecurityService, 
              public translations: Translations,
              private translateService: TranslateService,
              private languageStorageService: LanguageStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.initAuthService();
    this.initTranslationService();
    this.initRouteChangeSubscription();
  }

  ngOnDestroy(): void {
    if (this.checkAuthSub != null)
      this.checkAuthSub.unsubscribe();

    if (this.langChangeSub != null)
      this.langChangeSub.unsubscribe();

    if (this.routeChangeSub != null)
      this.routeChangeSub.unsubscribe();
  }

  initAuthService(): void {
    this.checkAuthSub = this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log("Authenticated: " + isAuthenticated);
      console.log("User Data: " + userData);
      console.log("Access Token: " + accessToken);
      console.log("ID Token: " + idToken);
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
    this.routeChangeSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => { 
      let url = (e as RouterEvent).url;
      let queryIndex = url.indexOf('?');
      url = url.substring(1, queryIndex > -1 ? queryIndex : undefined);
      
      if (url === CoreRoutes.Splash) {
        this.showHeaderFooter = false;
      } 
      else {
        this.showHeaderFooter = true;
      }

      this.activeRoute = url;
    });
  }

  getRouteData(key: string) {
    let child = this.activatedRoute.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data[key]) {
        return child.snapshot.data[key];
      } else {
        return null;
      }
    }
  }

  headerToggleEvent(toggled: boolean): void {
    this.showSearchBar = toggled;
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
