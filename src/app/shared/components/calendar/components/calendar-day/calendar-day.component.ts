import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICalendarDay } from '../../interfaces/calendar-day.interface';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input({required: true}) calendarDay!: ICalendarDay;
  @Input() outsideOfMonth: boolean = false;
  @Input() active: boolean = false;

  @Output() dayClick: EventEmitter<ICalendarDay> = new EventEmitter<ICalendarDay>();

  currentDay: boolean = false;

  ngOnInit() {
    this.currentDay = isSameDay(this.calendarDay?.date, new Date());
  }

  interact(event: MouseEvent | KeyboardEvent, day: ICalendarDay): void {
    if (event.type === 'click' || (event instanceof KeyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space'))) {
      this.dayClick.emit(day);
    }
  }
}
