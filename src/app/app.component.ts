import { Component, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { LanguageStorageService } from './core/services/language-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  checkAuthSub!: Subscription;
  langChangeSub!: Subscription;

  constructor(public oidcSecurityService: OidcSecurityService, 
              private translateService: TranslateService,
              private languageStorageService: LanguageStorageService) {

  }

  ngOnInit() {
    this.initAuthService();
    this.initTranslationService();
  }

  ngOnDestroy(): void {
    this.checkAuthSub.unsubscribe();
    this.langChangeSub.unsubscribe();
  }

  initAuthService(): void {
    this.checkAuthSub = this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log("Authenticated: " + isAuthenticated);
      console.log("User Data: " + userData);
      console.log("Access Token: " + accessToken);
      console.log("ID Token: " + idToken);

      if (isAuthenticated !== true) {
        this.login();
      }
    });
  }

  initTranslationService(): void {
    this.langChangeSub = this.translateService.onLangChange.subscribe(({lang, translations}) => {
      this.languageStorageService.setLanguage(lang);
    });

    let savedLang = this.languageStorageService.getLanguage();

    if (savedLang !== null && (savedLang == 'en' ||'fr')) {
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

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
