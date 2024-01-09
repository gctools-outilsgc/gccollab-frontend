import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { endOfDay, subDays, addDays, addWeeks, subWeeks, addHours, addMonths, endOfMonth, getDaysInMonth, startOfWeek, startOfMonth, differenceInCalendarDays, differenceInCalendarWeeks, differenceInCalendarMonths, isWithinInterval, startOfDay, isSameWeek, isSameMonth, subMonths, isSameHour } from 'date-fns';
import { CalendarView } from './interfaces/calendar-view.interface';
import { ICalendarEvent } from './interfaces/calendar-event.interface';
import { ICalendarDate } from './interfaces/calendar-date.interface';
import { Translations } from 'src/app/core/services/translations.service';
import { TranslateService } from '@ngx-translate/core';
import { TooltipDirection } from '../../models/tooltip-direction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() view: CalendarView = CalendarView.Day; // The current view (Month/Week/Day).
  @Input() date: Date = new Date();                 // The current date for our view.
  @Input() events: ICalendarEvent[] = [];           // All events for the calendar.
  @Input() daysOutlined: boolean = false;           // Displays an outline for each calendar day
  @Input() loading: boolean = false;                //

  dates: ICalendarDate[] = [];                        // The days for the current view.
  datesPaddingPre: ICalendarDate[] = [];              // Any days before the month that should be rendered.
  datesPaddingPost: ICalendarDate[] = [];             // Any days after the month that should be rendered.

  eventRows = 0;                                    // The highest # of events on any given day in our view.
  activeDayIndex = -1;                              // The active day (user selected)

  calendarStyle = {
    'grid-template-rows': 'repeat(5, 75px)',
    'grid-template-columns': 'revert-layer'
  }
  dateFormat = 'MMMM YYYY';
  
  toggleViewCallback = this.toggleView.bind(this);
  CalendarView = CalendarView;
  TooltipDirection = TooltipDirection;

  nextButtonTitle = this.translations.calendar.controls.next.title_month;
  nextButtonAria = this.translations.calendar.controls.next.aria_month;
  previousButtonTitle = this.translations.calendar.controls.previous.title_month;
  previousButtonAria = this.translations.calendar.controls.previous.aria_month;

  constructor(public translations: Translations) {
    
  }

  ngOnInit(): void {
    this.buildView();
    this.updateAria();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && !changes['events'].firstChange) {
      this.injectEvents();
    }
  }

  navigateCalendar(interval: number = 1, clickedDay: ICalendarDate | undefined = undefined): void {
    switch(this.view) {
      case CalendarView.Day:
        this.date = addDays(this.date, interval);
        break;
      case CalendarView.Week:
        this.date = addWeeks(this.date, interval);
        break;
      case CalendarView.Month:
        this.date = addMonths(this.date, interval);
        break;
    }
    this.buildView(clickedDay);
  }

  dayClick(day: ICalendarDate): void {
    const diff = this.view === CalendarView.Month ? differenceInCalendarMonths(day.date, this.date) : (this.view === CalendarView.Week ? differenceInCalendarWeeks(day.date, this.date) : differenceInCalendarDays(day.date, this.date));
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
    this.eventRows = 0;
    this.activeDayIndex = -1;

    switch(this.view) {
      case CalendarView.Day:

        const hoursInDay = 24;
        
        for (let i = 0 ; i < hoursInDay; i++) {
          this.dates.push({ date: addHours(startOfDay(this.date), i), events: [] });
        }

        this.calendarStyle = {
          'grid-template-rows': 'revert-layer',
          'grid-template-columns': 'repeat(1, 100%)',
        }
        this.dateFormat = 'MMMM d, YYYY';

        break;

      case CalendarView.Week:

        const daysWeek = 7;
        for (let i = 0 ; i < daysWeek; i++) {

          const date = addDays(startOfWeek(this.date), i);

          if (isSameMonth(date, this.date)) {
            this.dates.push({ date: date, events: [] });
          }
          else if (isSameMonth(date, subMonths(this.date, 1))) {
            this.datesPaddingPre.push({ date: date, events: [] });
          }
          else {
            this.datesPaddingPost.push({ date: date, events: [] });
          }
        }
        
        this.calendarStyle = {
          'grid-template-rows': 'repeat(1, 75px)',
          'grid-template-columns': 'revert-layer',
        }
        this.dateFormat = 'MMMM YYYY';

        break;

      case CalendarView.Month:

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
        this.dateFormat = 'MMMM YYYY';

        break;
    }

    this.injectEvents();

    if (clickedDay)
      this.setDayActive(clickedDay);
  }

  private injectEvents(): void {
    let allDays = this.datesPaddingPre.concat(this.dates, this.datesPaddingPost);
    allDays.forEach(day => {day.events = [];});

    var i = this.events.length;
    while (i--) {
      allDays.forEach(day => {

        try {
          let addEvent = false;

          switch(this.view) {
            case CalendarView.Month:
            case CalendarView.Week:

              const eventStartsEndsToday = isWithinInterval(this.events[i].startDate, {start: startOfDay(day.date), end: endOfDay(day.date)}) && 
                                         isWithinInterval(this.events[i].endDate, {start: startOfDay(day.date), end: endOfDay(day.date)});

              const eventSpansDay = isWithinInterval(endOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate}) || 
                                    isWithinInterval(startOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate});

              if (eventStartsEndsToday || eventSpansDay) 
                addEvent = true;
              
              break;

            case CalendarView.Day:
              const eventStartsEndsHr = isSameHour(this.events[i].startDate, day.date) || isSameHour(this.events[i].endDate, day.date);
              const eventSpansHr = isWithinInterval(day.date, {start: this.events[i].startDate, end: this.events[i].endDate});

              if (eventStartsEndsHr || eventSpansHr) 
                addEvent = true;
              
              break;
          }

          if (addEvent) {
            day.events.push(this.events[i]);

            if (day.events.length > this.eventRows)
                this.eventRows = day.events.length;
          }
        } catch(e) {} // Start/End Date incompatible so don't add it.
      });
    }

    //this.alignDayEvents();
  }

  private alignDayEvents(): void {

    const sortEvents = (events: ICalendarEvent[]) => events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    this.dates[0].events = sortEvents(this.dates[0].events);

    for (let i = 1; i < this.dates.length; i++) {

      const sortedEvents = [...this.dates[i - 1].events];

      this.dates[i].events = sortedEvents.map(event => this.dates[i].events.find(e => e.startDate === event.startDate)) as ICalendarEvent[];
      this.dates[i].events = sortEvents(this.dates[i].events);
    }
  }

  private toggleView(): void {
    if (this.view == CalendarView.Month) {
      this.view = CalendarView.Week
    }
    else if (this.view == CalendarView.Week) {
      this.view = CalendarView.Day;
    }
    else if (this.view == CalendarView.Day) {
      this.view = CalendarView.Month;
    }
    this.buildView();
    this.updateAria();
  }

  private setDayActive(day: ICalendarDate) {
    for (let i = 0; i < this.dates.length; i++) {
      if (day.date === this.dates[i].date) {
        this.activeDayIndex = this.activeDayIndex === i ? -1 : i;
        break;
      }
    }
  }

  private updateAria() {
    switch(this.view) {
      case CalendarView.Day:
        this.nextButtonTitle = this.translations.calendar.controls.next.title_day;
        this.previousButtonTitle = this.translations.calendar.controls.previous.title_day;
        this.nextButtonAria = this.translations.calendar.controls.next.aria_day;
        this.previousButtonAria = this.translations.calendar.controls.previous.aria_day;
        break;
      case CalendarView.Week:
        this.nextButtonTitle = this.translations.calendar.controls.next.title_week;
        this.previousButtonTitle = this.translations.calendar.controls.previous.title_week;
        this.nextButtonAria = this.translations.calendar.controls.next.aria_week;
        this.previousButtonAria = this.translations.calendar.controls.previous.aria_week;
        break;
      case CalendarView.Month:
        this.nextButtonTitle = this.translations.calendar.controls.next.title_month;
        this.previousButtonTitle = this.translations.calendar.controls.previous.title_month;
        this.nextButtonAria = this.translations.calendar.controls.next.aria_month;
        this.previousButtonAria = this.translations.calendar.controls.previous.aria_month;
        break;
    }
  }
}