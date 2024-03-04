/* eslint-disable no-case-declarations */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { endOfDay, subDays, addDays, addMonths, endOfMonth, getDaysInMonth, startOfMonth, differenceInCalendarMonths, isWithinInterval, startOfDay, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, isSameDay } from 'date-fns';
import { ICalendarEvent } from './interfaces/calendar-event.interface';
import { ICalendarDate } from './interfaces/calendar-date.interface';
import { ICalendarWeekDay } from './interfaces/calendar-weekday.interface';
import { Translations } from 'src/app/core/services/translations.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirection } from '../../models/tooltip-direction';
import { IEventForm } from '../event-form/event-form.component';
import { ResizeService } from 'src/app/core/services/resize.service';
import { Subscription } from 'rxjs';
import { DebounceService } from 'src/app/core/services/debounce.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {

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
  eventFormActive: boolean = false;

  calendarStyle = {
    'grid-template-rows': 'repeat(5, 75px)',
    'grid-template-columns': 'revert-layer',
    'grid-row-gap': '15px'
  }
  dateFormat = 'MMMM YYYY';

  TooltipDirection = TooltipDirection;

  nextButtonTitle = this.translations.calendar.controls.next.title_month;
  nextButtonAria = this.translations.calendar.controls.next.aria_month;
  previousButtonTitle = this.translations.calendar.controls.previous.title_month;
  previousButtonAria = this.translations.calendar.controls.previous.aria_month;

  eventFormData: IEventForm = {
    eventType: 'Hybrid',
    eventOrganizerName: '',
    eventName: '',
    eventLanguage: 'Bilingual',
    eventDescription: '',
    eventLocation: '',
    eventOnlinePlatform: '',
    eventDuration: 'Single',
    eventStartDate: '',
    eventStartTime: '12:00',
    eventEndDate: '',
    eventEndTime: '13:00',
  };

  private resizeSub!: Subscription;
  private prevWeekdayFormat: WeekdayFormat = WeekdayFormat.Full;

  constructor(public translations: Translations,
              private changeDetectorRef: ChangeDetectorRef,
              private resizeService: ResizeService,
              private debounceService: DebounceService,
              private elementRef: ElementRef) {
    
  }

  ngOnInit(): void {

    // Setup resize subscription to track the width of the component
    this.resizeSub = this.resizeService.resizeEvent.subscribe(() => {
      this.debounceService.debounce(() => {

        // Update the weekday format (short/long) depending on the width
        const newWeekdayFormat = this.buildWeekDays();
        if (this.prevWeekdayFormat !== newWeekdayFormat) {
          this.prevWeekdayFormat = newWeekdayFormat;
          this.changeDetectorRef.markForCheck();
        }
      }, 50);
    });

    // Build out the calendar
    this.prevWeekdayFormat = this.buildWeekDays();
    this.buildView();
    this.updateAria();

    // Set today as the active day in the calendar
    const today = new Date();
    for (let i = 0; i < this.dates.length; i++) {
      if (isSameDay(this.dates[i].date, today)) {
        this.setDayActive(this.dates[i]);
        break;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && !changes['events'].firstChange) {
      this.injectEvents();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeSub)
    this.resizeSub.unsubscribe();
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

  deleteEvent(event: ICalendarEvent) {
    const index = this.events.indexOf(event);
    if (index > -1) {
      this.events.splice(index, 1);
      this.injectEvents();
    }
  }

  toggleEventForm = () => {
    this.eventFormActive = !this.eventFormActive;

    if (this.eventFormActive) {
      this.eventFormData = {
        eventType: 'Hybrid',
        eventOrganizerName: '',
        eventName: '',
        eventLanguage: 'Bilingual',
        eventDescription: '',
        eventLocation: '',
        eventOnlinePlatform: '',
        eventDuration: 'Single',
        eventStartDate: '',
        eventStartTime: '12:00',
        eventEndDate: '',
        eventEndTime: '13:00',
      };

      if (this.activeDayIndex > -1) {
        this.eventFormData.eventStartDate = this.getEventFormDateString(this.dates[this.activeDayIndex].date);
        this.eventFormData.eventEndDate = this.eventFormData.eventStartDate;
      }
    }
  }

  toggleSearch = () => {
    this.searchActive = !this.searchActive;
    this.changeDetectorRef.markForCheck();
  }

  private buildWeekDays(): WeekdayFormat {
    const today = new Date();
    const format = this.elementRef.nativeElement.offsetWidth < 600 ? WeekdayFormat.Short : WeekdayFormat.Full;
    this.weekdays = [
      { title: this.translations.calendar.days[format].sun, isToday: isSunday(today) },
      { title: this.translations.calendar.days[format].mon, isToday: isMonday(today) },
      { title: this.translations.calendar.days[format].tue, isToday: isTuesday(today) },
      { title: this.translations.calendar.days[format].wed, isToday: isWednesday(today) },
      { title: this.translations.calendar.days[format].thu, isToday: isThursday(today) },
      { title: this.translations.calendar.days[format].fri, isToday: isFriday(today) },
      { title: this.translations.calendar.days[format].sat, isToday: isSaturday(today) },
    ];
    return format;
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
      this.datesPaddingPost = [];
    }

    // Update the calendar style to account for the number of week rows
    this.calendarStyle = {
      'grid-template-rows': 'repeat(' + (daysMonth + daysBeforeMonth + daysAfterMonth) / 7 + ', 75px)',
      'grid-template-columns': 'revert-layer',
      'grid-row-gap': '15px'
    };

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
          const eventStartsEndsToday = isWithinInterval(this.events[i].startDate, {start: startOfDay(day.date), end: endOfDay(day.date)}) && 
                                     isWithinInterval(this.events[i].endDate, {start: startOfDay(day.date), end: endOfDay(day.date)});

          const eventSpansDay = isWithinInterval(endOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate}) || 
                                isWithinInterval(startOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate});

          if (eventStartsEndsToday || eventSpansDay) {
            day.events.push(this.events[i]);
          }
        } catch(e) { /* empty */ } // Start/End Date incompatible so don't add it.
      });
    }
  }

  private setDayActive(day: ICalendarDate) {
    for (let i = 0; i < this.dates.length; i++) {
      if (day.date === this.dates[i].date) {
        this.activeDayIndex = this.activeDayIndex === i ? -1 : i;
        break;
      }
    }

    if (this.activeDayIndex === -1) 
      this.eventFormActive = false;

    if (this.eventFormActive) {
      this.eventFormData.eventStartDate = this.getEventFormDateString(this.dates[this.activeDayIndex].date);
      this.eventFormData.eventEndDate = this.eventFormData.eventStartDate;
    }
  }

  // Do we need this since there's only the month view?
  private updateAria() {
    this.nextButtonTitle = this.translations.calendar.controls.next.title_month;
    this.previousButtonTitle = this.translations.calendar.controls.previous.title_month;
    this.nextButtonAria = this.translations.calendar.controls.next.aria_month;
    this.previousButtonAria = this.translations.calendar.controls.previous.aria_month;
  }

  private getEventFormDateString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }
}

enum WeekdayFormat {
  Full = 'full',
  Short = 'short'
}