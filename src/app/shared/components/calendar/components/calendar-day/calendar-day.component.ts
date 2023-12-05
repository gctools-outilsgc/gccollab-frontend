import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ICalendarDay } from '../../interfaces/calendar-day.interface';
import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

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
  @Input() colors: string [] = ['#6C0DBA', '#04A19E', '#3B18BA', '#AC0DBA'];

  @Output() dayClick: EventEmitter<ICalendarDay> = new EventEmitter<ICalendarDay>();

  currentDay: boolean = false;
  eventStyles: IEventStyle[] = [];

  ngOnInit() {
    this.currentDay = isSameDay(this.calendarDay.date, new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['calendarDay'] && this.calendarDay?.events.length > 1) {
      this.sortEvents();
      this.buildEventStyles();
    }
  }

  interact(event: MouseEvent | KeyboardEvent, day: ICalendarDay): void {
    if (event.type === 'click' || (event instanceof KeyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space'))) {
      this.dayClick.emit(day);
    }
  }

  private sortEvents(): void {
    // Sort events by the start date
    this.calendarDay.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Move any events that start and end today to the back of the list (so events spanning days line up)
    for (let i = this.calendarDay.events.length - 1; i >= 0; i--) {
      if (isWithinInterval(this.calendarDay.events[i].startDate, {start: startOfDay(this.calendarDay.date), end: endOfDay(this.calendarDay.date)}) && 
          isWithinInterval(this.calendarDay.events[i].endDate, {start: startOfDay(this.calendarDay.date), end: endOfDay(this.calendarDay.date)})) {
          this.calendarDay.events.push(this.calendarDay.events.splice(i, 1)[0]);
      }
    }
  }

  private buildEventStyles(): void {
    this.eventStyles = [];
    for (let i = 0; i < this.calendarDay.events.length; i++) {
      this.eventStyles.push({
        'height': 'calc((100% / ' + this.eventRows + ') - ' + (this.eventRows > 1 ? 1 : 0) + 'px)',
        'margin-left': this.startDateOffset(this.calendarDay.events[i].startDate) + '%',
        'margin-right': this.endDateOffset(this.calendarDay.events[i].endDate) + '%',
        'background-color': this.eventColor(i),
      });
    }
  }

  private startDateOffset(date: Date) {
    if (isSameDay(date, this.calendarDay.date))
      return 100 - this.percentDayRemaining(date);
    return 0;
  }

  private endDateOffset(date: Date) {
    if (isSameDay(date, this.calendarDay.date))
      return this.percentDayRemaining(date);
    return 0;
  }

  private percentDayRemaining(date: Date): number {
     const currentDate = endOfDay(this.calendarDay.date);
     const timeDifference = currentDate.getTime() - date.getTime();
     const millisecondsInADay = 24 * 60 * 60 * 1000;
     return (timeDifference / millisecondsInADay) * 100;
  }

  // TODO: Canceled and past events
  private eventColor(index: number): string {
    if (index < 0)
      return this.colors[0];

    return this.colors[index % this.colors.length];
  }
}

interface IEventStyle {
  'height': string;
  'margin-left': string;
  'margin-right': string;
  'background-color': string
}