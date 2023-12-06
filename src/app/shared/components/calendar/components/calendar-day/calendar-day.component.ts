import { Component, Input, OnInit, Output, EventEmitter, IterableDiffers, IterableDiffer, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { ICalendarDay } from '../../interfaces/calendar-day.interface';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDayComponent implements OnInit, DoCheck {
  @Input({required: true}) calendarDay: ICalendarDay = { date: new Date(), events: [] };
  @Input() outsideOfMonth: boolean = false;
  @Input() active: boolean = false;
  @Input() eventRows: number = 0;
  @Input() loading: boolean = false;
  @Input() outline: boolean = false;

  @Output() dayClick: EventEmitter<ICalendarDay> = new EventEmitter<ICalendarDay>();

  currentDay: boolean = false;
  eventStyles: IEventStyle[] = [];

  private eventBorderRadius: number = 0;
  private iterableDiffer: IterableDiffer<ICalendarEvent>;

  constructor(private iterableDiffers: IterableDiffers, 
              private router: Router) {
    this.iterableDiffer = iterableDiffers.find(this.calendarDay.events).create();
  }

  ngOnInit() {
    this.currentDay = isSameDay(this.calendarDay.date, new Date());
  }

  ngDoCheck() {
    if (this.iterableDiffer.diff(this.calendarDay.events)) {
      this.sortEvents();
      this.buildEventStyles();
    }
  }

  interact(event: MouseEvent | KeyboardEvent, day: ICalendarDay): void {
    if (event.type === 'click' || (event instanceof KeyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space'))) {
      this.dayClick.emit(day);
    }
  }

  routeToEvent(eventId: string, event: MouseEvent | KeyboardEvent) {
    if (eventId && (event.type === 'click' || (event instanceof KeyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space')))) 
      this.router.navigateByUrl(CoreRoutes.Events + '/' + eventId);
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

      const marginLeft = this.startDateOffset(this.calendarDay.events[i].startDate);
      const marginRight = this.endDateOffset(this.calendarDay.events[i].endDate);

      this.eventStyles.push({
        'height': 'calc((100% / ' + this.eventRows + ') - ' + (this.eventRows > 1 ? 1 : 0) + 'px)',
        'margin-left': marginLeft + '%',
        'margin-right': marginRight + '%',
        'background-color': this.calendarDay.events[i].color,
        'border-top-left-radius': marginLeft > 0 ? this.eventBorderRadius + 'px' : '0',
        'border-top-right-radius': marginRight > 0 ? this.eventBorderRadius + 'px' : '0',
        'border-bottom-left-radius': marginLeft > 0 ? this.eventBorderRadius + 'px' : '0',
        'border-bottom-right-radius': marginRight > 0 ? this.eventBorderRadius + 'px' : '0'
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
}

interface IEventStyle {
  'height': string;
  'margin-left': string;
  'margin-right': string;
  'background-color': string;
  'border-top-left-radius': string;
  'border-top-right-radius': string;
  'border-bottom-left-radius': string;
  'border-bottom-right-radius': string;
}