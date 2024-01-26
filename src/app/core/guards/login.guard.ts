import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * A `CanActivate` route guard that ensured the user is not authenticated.
 * @remark If the user is authenticated they will be re-routed to the base route of the router that this guard is used in.
 * @returns true if the user is not authenticated.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map(({ isAuthenticated }) => {
        if (!isAuthenticated) {
          return true;
        }
        return this.router.parseUrl('');
      }),
    );
  }
}
