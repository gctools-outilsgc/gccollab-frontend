import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageStorageService {

  private _localStorage: Storage;
  private readonly _key: string = 'gccollab-lang'
  
  constructor(private _localStorageRefService: LocalStorageRefService) { 
    this._localStorage = _localStorageRefService.localStorage;
  }

  setLanguage(lang: string): void {
    this._localStorage.setItem(this._key, lang);
  }

  getLanguage(): string | null {
    return this._localStorage.getItem(this._key);
  }

  clearLanguage(): void {
    this._localStorage.removeItem(this._key);
  }
}
