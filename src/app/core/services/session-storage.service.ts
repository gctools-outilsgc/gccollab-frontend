import { Injectable } from '@angular/core';
import { AbstractSecurityStorage } from 'angular-auth-oidc-client';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements AbstractSecurityStorage {

  private _localStorage: Storage;

  constructor(private _localStorageRefService: LocalStorageRefService) { 
    this._localStorage = _localStorageRefService.localStorage;
  }

  read(key: string) {
    return this._localStorage.getItem(key);
  }

  write(key: string, value: any): void {
    this._localStorage.setItem(key, value);
  }

  remove(key: string): void {
    this._localStorage.removeItem(key);
  }

  clear(): void {
    // TODO: Clear only the keys related to session
    this._localStorage.clear();
  }
}
