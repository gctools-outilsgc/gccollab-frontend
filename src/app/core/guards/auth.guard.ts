import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';
import { environment } from '../../../environments/environment'

/**
   * A `CanActivate` route guard that ensured the user is authenticated.
   * @remark If the user is not authenticated they will be re-routed to the login screen.
   * @returns true if the user is authenticated.
   */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private oidcSecurityService: OidcSecurityService, 
    private sessionStorageService: SessionStorageService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!environment.authEnabled)
        return true;

      return this.oidcSecurityService.isAuthenticated$.pipe(
        map(({ isAuthenticated }) => {

          if (isAuthenticated)
            return true;

          this.sessionStorageService.write('gccollab-retUrl', state.url);
          this.oidcSecurityService.authorize();

          return false; 
        })
      );
  }
}