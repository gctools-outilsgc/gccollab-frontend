import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FocusTrackingService {
  private appFocusSubject = new Subject<boolean>();

  constructor() {
    this.setupFocusListener();
  }

  private setupFocusListener() {
    window.addEventListener('focus', () => {
      this.appFocusSubject.next(true);
    });
  }

  getAppFocusObservable(): Observable<boolean> {
    return this.appFocusSubject.asObservable();
  }
}
