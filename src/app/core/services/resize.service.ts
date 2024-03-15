import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  resizeEvent: EventEmitter<Event> = new EventEmitter();

  constructor() {
    this.setupResizeListener();
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', (event) => {
      this.resizeEvent.emit(event);
    });
  }
}
