import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebounceService {
  private debounceSubject = new Subject<() => unknown>();

  constructor() {}

  debounce(fn: () => unknown, delay: number): void {
    this.debounceSubject.next(fn);
    this.debounceSubject.pipe(debounceTime(delay)).subscribe((func) => {
      func();
    });
  }

  getDebouncedObservable(delay: number): Observable<() => unknown> {
    return this.debounceSubject.pipe(debounceTime(delay));
  }
}
