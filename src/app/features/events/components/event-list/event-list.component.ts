import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent {
  @Input() model?: Event[];
  @Input() isLoading: boolean = false;
  @Output() confirm = new EventEmitter();
  @Output() decline = new EventEmitter();

  confirmEvent(event: Event) {
    this.confirm.emit(event);
  }

  declineEvent(event: Event) {
    this.decline.emit(event);
  }
}
