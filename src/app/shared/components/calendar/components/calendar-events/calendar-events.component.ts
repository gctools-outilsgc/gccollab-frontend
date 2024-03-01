import { Component, ChangeDetectionStrategy, OnInit, Input} from '@angular/core';
import { ICalendarDate } from '../../interfaces/calendar-date.interface';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventsComponent implements OnInit {
  @Input({required: true}) day!: ICalendarDate;
  
  constructor() {
    
  }

  ngOnInit() {
    console.log(this.day)
  }
}