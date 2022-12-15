import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

/**
   * A `CanActivate` route guard that redirects the user to the externalUrl.
   * @returns false.
   */
@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    window.location.href = route.data['externalUrl'];
    return false;
  }
  
}
