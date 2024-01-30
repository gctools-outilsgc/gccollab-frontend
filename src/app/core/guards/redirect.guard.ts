import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * A `CanActivate` route guard that opens an externalUrl in a new tab.
 * @returns false.
 */
@Injectable({
  providedIn: 'root',
})
export class RedirectGuard {
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const externalUrl = route.data['externalUrl'];

    if (externalUrl) {
      window.open(externalUrl, '_blank')?.focus();
    } else {
      console.error(`RedirectGuard: No externalUrl data provided for the '${state.url}' route.`);
    }

    return false;
  }
}
