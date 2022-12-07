import { Component, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  authSubscription!: Subscription;

  constructor(public oidcSecurityService: OidcSecurityService, 
              private translateService: TranslateService) {

    translateService.setDefaultLang('en');

    let browserLang = translateService.getBrowserLang();
    if (browserLang) {
      translateService.use(browserLang);
    }
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.log("Authenticated: " + isAuthenticated);
      console.log("User Data: " + userData);
      console.log("Access Token: " + accessToken);
      console.log("ID Token: " + idToken);

      if (isAuthenticated !== true) {
        this.login();
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  } 

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }
}
