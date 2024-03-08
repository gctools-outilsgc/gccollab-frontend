import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from 'src/app/features/events/models/event';

@Component({
  selector: 'app-calendar-search',
  templateUrl: './calendar-search.component.html',
  styleUrls: ['./calendar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSearchComponent {
  @Input({required: true}) events: Event[] = [];
  
  constructor() {
    
  }
}