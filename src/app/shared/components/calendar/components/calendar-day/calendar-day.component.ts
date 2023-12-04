import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ICalendarDay } from '../../interfaces/calendar-day.interface';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input({required: true}) calendarDay: ICalendarDay = { date: new Date(), events: [] };
  @Input() outsideOfMonth: boolean = false;
  @Input() active: boolean = false;
  @Input() eventRows: number = 0;

  @Output() dayClick: EventEmitter<ICalendarDay> = new EventEmitter<ICalendarDay>();

  currentDay: boolean = false;
  colors: string[] = ['#6C0DBA', '#04A19E', '#3B18BA', '#AC0DBA'];

  ngOnInit() {
    this.currentDay = isSameDay(this.calendarDay.date, new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['calendarDay'] && this.calendarDay?.events.length > 1) {
      this.calendarDay.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
  }

  interact(event: MouseEvent | KeyboardEvent, day: ICalendarDay): void {
    if (event.type === 'click' || (event instanceof KeyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space'))) {
      this.dayClick.emit(day);
    }
  }

  eventColor(index: number): string {
    if (index < 0)
      return this.colors[0];

    return this.colors[index % this.colors.length];
  }

  percentageOfDayLeft(date: Date, dateToCompare: Date): number {
    if (isSameDay(date, dateToCompare)) {
      const totalMillisecondsInDay = 24 * 60 * 60 * 1000;
      const millisecondsPassed = date.getTime() % totalMillisecondsInDay;
      return (1 - millisecondsPassed / totalMillisecondsInDay) * 100;
    }
    return 100;
  }
}
