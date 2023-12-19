import { Component, Input, OnInit, Output, EventEmitter, IterableDiffers, IterableDiffer, DoCheck, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { isSameDay, isWithinInterval, startOfDay, endOfDay, isSameHour } from 'date-fns';
import { ICalendarDate } from '../../interfaces/calendar-date.interface';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';
import { Router } from '@angular/router';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { CalendarView } from '../../interfaces/calendar-view.interface';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDayComponent implements OnInit, DoCheck, OnChanges {
  @Input({required: true}) calendarDate: ICalendarDate = { date: new Date(), events: [] };
  @Input() view: CalendarView = CalendarView.Month;
  @Input() outsideOfMonth: boolean = false;
  @Input() active: boolean = false;
  @Input() eventRows: number = 0;
  @Input() loading: boolean = false;
  @Input() outline: boolean = false;

  @Output() dayClick: EventEmitter<ICalendarDate> = new EventEmitter<ICalendarDate>();

  currentDay: boolean = false;
  eventStyles: IEventStyle[] = [];
  CalendarView = CalendarView;

  private eventBorderRadius: number = 0;
  private iterableDifferEvents: IterableDiffer<ICalendarEvent>;

  constructor(private iterableDiffers: IterableDiffers, 
              private router: Router) {
    this.iterableDifferEvents = iterableDiffers.find(this.calendarDate.events).create();
  }

  ngOnInit() {
    this.setCurrentDate();
  }

  ngDoCheck() {
    if (this.iterableDifferEvents.diff(this.calendarDate.events)) {
      this.sortEvents();
      this.buildEventStyles();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.setCurrentDate();
    }
  }

  interact(event: MouseEvent | KeyboardEvent, day: ICalendarDate): void {
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
    this.calendarDate.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Move any events that start and end today to the back of the list (so events spanning days line up)
    for (let i = this.calendarDate.events.length - 1; i >= 0; i--) {
      if (isWithinInterval(this.calendarDate.events[i].startDate, {start: startOfDay(this.calendarDate.date), end: endOfDay(this.calendarDate.date)}) && 
          isWithinInterval(this.calendarDate.events[i].endDate, {start: startOfDay(this.calendarDate.date), end: endOfDay(this.calendarDate.date)})) {
          this.calendarDate.events.push(this.calendarDate.events.splice(i, 1)[0]);
      }
    }
  }

  private buildEventStyles(): void {
    this.eventStyles = [];
    for (let i = 0; i < this.calendarDate.events.length; i++) {
      
      const marginLeft = this.startDateOffset(this.calendarDate.events[i].startDate);
      const marginRight = this.endDateOffset(this.calendarDate.events[i].endDate);

      this.eventStyles.push({
        'height': 'calc((100% / ' + this.eventRows + ') - ' + (this.eventRows > 1 ? 1 : 0) + 'px)',
        'margin-left': marginLeft + '%',
        'margin-right': marginRight + '%',
        'background-color': this.calendarDate.events[i].color,
        'border-top-left-radius': marginLeft > 0 ? this.eventBorderRadius + 'px' : '0',
        'border-top-right-radius': marginRight > 0 ? this.eventBorderRadius + 'px' : '0',
        'border-bottom-left-radius': marginLeft > 0 ? this.eventBorderRadius + 'px' : '0',
        'border-bottom-right-radius': marginRight > 0 ? this.eventBorderRadius + 'px' : '0'
      });
    }
  }

  private setCurrentDate(): void {
    this.currentDay = isSameDay(this.calendarDate.date, new Date());
  }

  private startDateOffset(date: Date) {
    if (isSameDay(date, this.calendarDate.date))
      return 100 - this.percentDayRemaining(date);
    return 0;
  }

  private endDateOffset(date: Date) {
    if (isSameDay(date, this.calendarDate.date))
      return this.percentDayRemaining(date);
    return 0;
  }

  private percentDayRemaining(date: Date): number {
     const currentDate = endOfDay(this.calendarDate.date);
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