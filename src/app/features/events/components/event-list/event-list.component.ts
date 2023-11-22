import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../models/event';
import { EventCardView } from '../../models/eventcardview';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent {
  @Input() model?: Event[];
  @Input() isLoading: boolean = false;
  @Input() loadingCount: number = 3;
  @Input() view: string | EventCardView = EventCardView.Small;

  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  loadingItems: number[];

  constructor() {
    this.loadingItems = [];
    
    for (let i = 0; i < this.loadingCount; i++) {
      this.loadingItems.push(i);
    }
  }

  confirmEvent(event: Event) {
    this.confirm.emit(event);
  }

  declineEvent(event: Event) {
    this.decline.emit(event);
  }

  isLargeView(): boolean {
    return this.view === EventCardView.Large;
  }
}
