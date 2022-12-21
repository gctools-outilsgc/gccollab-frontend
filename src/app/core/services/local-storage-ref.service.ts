import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageRefService {

  constructor() { }

  get localStorage(): Storage {
    return getLocalStorage();
  }
}
