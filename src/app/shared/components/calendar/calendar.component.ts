/* eslint-disable no-case-declarations */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { endOfDay, subDays, addDays, addMonths, endOfMonth, getDaysInMonth, startOfMonth, differenceInCalendarMonths, isWithinInterval, startOfDay, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday } from 'date-fns';
import { ICalendarEvent } from './interfaces/calendar-event.interface';
import { ICalendarDate } from './interfaces/calendar-date.interface';
import { ICalendarWeekDay } from './interfaces/calendar-weekday.interface';
import { Translations } from 'src/app/core/services/translations.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirection } from '../../models/tooltip-direction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() date: Date = new Date();                 // The current date for our view.
  @Input() events: ICalendarEvent[] = [];           // All events for the calendar.
  @Input() daysOutlined: boolean = false;           // Displays an outline for each calendar day
  @Input() loading: boolean = false;                //

  dates: ICalendarDate[] = [];                        // The days for the current view.
  datesPaddingPre: ICalendarDate[] = [];              // Any days before the month that should be rendered.
  datesPaddingPost: ICalendarDate[] = [];             // Any days after the month that should be rendered.
  weekdays: ICalendarWeekDay[] = [];

  activeDayIndex = -1;                              // The active day (user selected)
  searchActive: boolean = false;

  // REMOVE
  calendarStyle = {
    'grid-template-rows': 'repeat(5, 75px)',
    'grid-template-columns': 'revert-layer'
  }
  dateFormat = 'MMMM YYYY';

  TooltipDirection = TooltipDirection;

  nextButtonTitle = this.translations.calendar.controls.next.title_month;
  nextButtonAria = this.translations.calendar.controls.next.aria_month;
  previousButtonTitle = this.translations.calendar.controls.previous.title_month;
  previousButtonAria = this.translations.calendar.controls.previous.aria_month;

  constructor(public translations: Translations,
              private changeDetectorRef: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.buildWeekDays();
    this.buildView();
    this.updateAria();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && !changes['events'].firstChange) {
      this.injectEvents();
    }
  }

  toggleSearch = () => {
    this.searchActive = !this.searchActive;
    this.changeDetectorRef.markForCheck();
  }

  navigateCalendar(interval: number = 1, clickedDay: ICalendarDate | undefined = undefined): void {
    this.date = addMonths(this.date, interval);
    this.buildView(clickedDay);
  }

  dayClick(day: ICalendarDate): void {
    const diff = differenceInCalendarMonths(day.date, this.date);

    if (diff !== 0) {
      this.activeDayIndex = -1;
      this.navigateCalendar(diff, day);
    }

    this.setDayActive(day);
  }

  private buildView(clickedDay: ICalendarDate | undefined = undefined): void {
    this.datesPaddingPre = []; 
    this.datesPaddingPost = []
    this.dates = [];
    this.activeDayIndex = -1;

    // Create days for each day of the month
    const daysMonth = getDaysInMonth(this.date);
    for (let i = 0 ; i < daysMonth; i++) {
      this.dates.push({ date: new Date(this.date.getFullYear() , this.date.getMonth(), i + 1), events: [] });
    }
  
    // Create any days for the previous month that are in the first week row
    const daysBeforeMonth = startOfMonth(this.date).getDay();
    for (let i = 0 ; i < daysBeforeMonth; i++) {
      this.datesPaddingPre.push({ date: subDays(startOfMonth(this.date), i + 1), events: [] });
    }
    this.datesPaddingPre.reverse();
  
    // Create any days for the next month that are in the final week row
    const daysAfterMonth = (daysMonth + daysBeforeMonth > 35 ? 42 : 35) - daysMonth - daysBeforeMonth;
    for (let i = 0 ; i < daysAfterMonth; i++) {
      this.datesPaddingPost.push({ date: addDays(addMonths(startOfMonth(this.date), 1), i), events: [] });
    }

    // Edge case when a month has 28 days and begins on Sunday, we don't need any post padding days.
    if (daysBeforeMonth == 0 && endOfMonth(this.date).getDay() == 28) {
      this.datesPaddingPost = []
    }

    // Update the calendar style to account for the number of week rows
    this.calendarStyle = {
      'grid-template-rows': 'repeat(' + (daysMonth + daysBeforeMonth + daysAfterMonth) / 7 + ', 75px)',
      'grid-template-columns': 'revert-layer',
    }

    this.dateFormat = 'MMMM YYYY'; // remove?

    this.injectEvents();

    if (clickedDay)
      this.setDayActive(clickedDay);
  }

  private injectEvents(): void {
    const allDays = this.datesPaddingPre.concat(this.dates, this.datesPaddingPost);
    allDays.forEach(day => {day.events = [];});

    let i = this.events.length;
    while (i--) {
      allDays.forEach(day => {

        try {
          let addEvent = false;

          const eventStartsEndsToday = isWithinInterval(this.events[i].startDate, {start: startOfDay(day.date), end: endOfDay(day.date)}) && 
                                     isWithinInterval(this.events[i].endDate, {start: startOfDay(day.date), end: endOfDay(day.date)});

          const eventSpansDay = isWithinInterval(endOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate}) || 
                                isWithinInterval(startOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate});

          if (eventStartsEndsToday || eventSpansDay) 
            addEvent = true;

          if (addEvent) {
            day.events.push(this.events[i]);
          }
        } catch(e) { /* empty */ } // Start/End Date incompatible so don't add it.
      });
    }
  }

  private buildWeekDays() {
    const today = new Date();
    const titleLength = 'full'; // TODO: full or short depending on mobile layout
    this.weekdays = [
      { title: this.translations.calendar.days[titleLength].sun, isToday: isSunday(today) },
      { title: this.translations.calendar.days[titleLength].mon, isToday: isMonday(today) },
      { title: this.translations.calendar.days[titleLength].tue, isToday: isTuesday(today) },
      { title: this.translations.calendar.days[titleLength].wed, isToday: isWednesday(today) },
      { title: this.translations.calendar.days[titleLength].thu, isToday: isThursday(today) },
      { title: this.translations.calendar.days[titleLength].fri, isToday: isFriday(today) },
      { title: this.translations.calendar.days[titleLength].sat, isToday: isSaturday(today) },
    ];
  }

  private setDayActive(day: ICalendarDate) {
    for (let i = 0; i < this.dates.length; i++) {
      if (day.date === this.dates[i].date) {
        this.activeDayIndex = this.activeDayIndex === i ? -1 : i;
        break;
      }
    }
  }

  // Do we need this since there's only the month view?
  private updateAria() {
    this.nextButtonTitle = this.translations.calendar.controls.next.title_month;
    this.previousButtonTitle = this.translations.calendar.controls.previous.title_month;
    this.nextButtonAria = this.translations.calendar.controls.next.aria_month;
    this.previousButtonAria = this.translations.calendar.controls.previous.aria_month;
  }
}