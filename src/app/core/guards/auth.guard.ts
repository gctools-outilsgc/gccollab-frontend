import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
   * A `CanActivate` route guard that ensured the user is authenticated.
   * @remark If the user is not authenticated they will be re-routed to the login screen.
   * @returns true if the user is authenticated.
   */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.oidcSecurityService.isAuthenticated$.pipe(
        map(({ isAuthenticated }) => {
          if (isAuthenticated) {
            return true;
          }
          return this.router.parseUrl('/login');
        })
      );
  }
}