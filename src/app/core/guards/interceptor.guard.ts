import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

/**
 * A `CanActivate` route guard that checks for a returnUrl in session storage
 * @remark If there is a returnUrl saved to session storage it will redirect to that route
 * @returns true if the route can be activated
 */
@Injectable({
  providedIn: 'root',
})
export class InterceptorGuard {
  private readonly returnUrlKey: string = 'gccollab-retUrl';

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const retUrl = this.sessionStorageService.read(this.returnUrlKey);

    if (retUrl) {
      this.sessionStorageService.remove(this.returnUrlKey);
      return this.router.parseUrl(retUrl);
    }

    return true;
  }
}
