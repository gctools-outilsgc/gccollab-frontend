import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageStorageService {

  private _localStorage: Storage;
  
  constructor(private _localStorageRefService: LocalStorageRefService) { 
    this._localStorage = _localStorageRefService.localStorage;
  }

  setLanguage(lang: string): void {
    this._localStorage.setItem('gccollab-lang', lang);
  }

  getLanguage(): string | null {
    return this._localStorage.getItem('gccollab-lang');
  }

  clearLanguage(): void {
    this._localStorage.removeItem('gccollab-lang');
  }
}
