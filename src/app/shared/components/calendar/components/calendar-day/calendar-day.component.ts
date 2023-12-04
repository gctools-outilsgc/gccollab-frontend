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
  @Input() previousDay: ICalendarDay = { date: new Date(), events: [] };
  @Input() nextDay: ICalendarDay = { date: new Date(), events: [] };
  @Input() outsideOfMonth: boolean = false;
  @Input() active: boolean = false;

  @Output() dayClick: EventEmitter<ICalendarDay> = new EventEmitter<ICalendarDay>();

  currentDay: boolean = false;
  colors: string[] = ['#6C0DBA', '#04A19E', '#3B18BA', '#AC0DBA'];
  numberOfEvents: number = 0;

  // TODO: Calc margin offset for event start/end times.

  ngOnInit() {
    this.currentDay = isSameDay(this.calendarDay.date, new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    let recalcEvents = false;

    if (changes['calendarDay'] && this.calendarDay?.events.length > 1) {
      this.calendarDay.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      recalcEvents = true;
    }

    if (changes['previousDay'] && this.previousDay?.events.length > 1) {
      this.previousDay.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      recalcEvents = true;
    }

    if (changes['nextDay'] && this.nextDay?.events.length > 1) {
      this.nextDay.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      recalcEvents = true;
    }

    if (recalcEvents)
      this.calcNumberOfEvents();
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

  private calcNumberOfEvents(): void {

    // See if any events span from previous into today or today into the next day
    const eventSpanPreviousDay = this.calendarDay.events.filter((event) => this.previousDay.events.includes(event)).length > 0;
    const eventSpanNextDay = this.calendarDay.events.filter((event) => this.nextDay.events.includes(event)).length > 0;
    
    // If any events are spanning into previous/next day, add that day's total events to the event count array, as well as today's events.
    const eventCounts = [eventSpanPreviousDay ? this.previousDay.events.length : 0, eventSpanNextDay ? this.nextDay.events.length : 0, this.calendarDay.events.length];

    // Return the largest of the 3.
    this.numberOfEvents = eventCounts.reduce((max, current) => (current > max ? current : max), eventCounts[0]);
  }
}
