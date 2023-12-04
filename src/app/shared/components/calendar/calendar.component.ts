import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { addHours, subHours, endOfDay, subDays, addDays, addWeeks, addMonths, endOfMonth, getDaysInMonth, startOfWeek, startOfMonth, differenceInCalendarDays, differenceInCalendarWeeks, differenceInCalendarMonths, isWithinInterval, isSameDay, startOfDay } from 'date-fns';
import { CalendarView } from './interfaces/calendar-view.interface';
import { ICalendarEvent } from './interfaces/calendar-event.interface';
import { ICalendarDay } from './interfaces/calendar-day.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  @Input() view: CalendarView = CalendarView.Month;
  @Input() date: Date = new Date();
  @Input() events: ICalendarEvent[] = [];

  days: ICalendarDay[] = [];
  daysPaddingPre: ICalendarDay[] = [];
  daysPaddingPost: ICalendarDay[] = [];

  calendarStyle = {
    'grid-template-rows': 'repeat(5, 75px)'
  }
  
  toggleViewCallback = this.toggleView.bind(this);

  CalendarView = CalendarView;
  dayToday = this.date.getDay();
  activeDayIndex = -1;
  eventRows = 0; 
  dummyDay: ICalendarDay = { date: new Date(), events: [] };

  constructor() {
    this.events.push({ title: 'Shawarma Grand Tour', startDate: new Date(), endDate: addHours(addDays(new Date(), 3), 3) });
    this.events.push({ title: 'Chili Cook Off', startDate: addHours(new Date(), 3), endDate: subHours(addDays(new Date(), 3), 3) });
    this.events.push({ title: 'Car Show', startDate: addDays(new Date(), 1), endDate: addDays(new Date(), 2) });
    this.events.push({ title: 'Doc Appointment', startDate: addDays(new Date(), 1), endDate: addDays(new Date(), 2) });
    this.events.push({ title: 'Lunch w/ Friends', startDate: addDays(new Date(), 11), endDate: addDays(new Date(), 12) });
    this.events.push({ title: 'Charity Event', startDate: addDays(new Date(), 11), endDate: addDays(new Date(), 12) });
    this.events.push({ title: 'Shea Event', startDate: new Date(), endDate: addDays(new Date(), 12) });
  }

  ngOnInit(): void {
    this.buildView();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] && this.events?.length > 1) {
      this.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
  }

  buildView(clickedDay: ICalendarDay | undefined = undefined): void {
    this.daysPaddingPre = []; 
    this.daysPaddingPost = []
    this.days = [];

    switch(this.view) {
      case CalendarView.Week:

        const daysWeek = 7;
        for (let i = 0 ; i < daysWeek; i++) {
          this.days.push({ date: addDays(startOfWeek(this.date), i), events: [] });
        }
        
        this.calendarStyle = {
          'grid-template-rows': 'repeat(1, 75px)'
        }

        break;

      case CalendarView.Month:

        // Create days for each day of the month
        const daysMonth = getDaysInMonth(this.date);
        for (let i = 0 ; i < daysMonth; i++) {
          this.days.push({ date: new Date(this.date.getFullYear() , this.date.getMonth(), i + 1), events: [] });
        }
      
        // Create any days for the previous month that are in the first week row
        const daysBeforeMonth = startOfMonth(this.date).getDay();
        for (let i = 0 ; i < daysBeforeMonth; i++) {
          this.daysPaddingPre.push({ date: subDays(startOfMonth(this.date), i + 1), events: [] });
        }
        this.daysPaddingPre.reverse();
      
        // Create any days for the next month that are in the final week row
        const daysAfterMonth = (daysMonth + daysBeforeMonth > 35 ? 42 : 35) - daysMonth - daysBeforeMonth;
        for (let i = 0 ; i < daysAfterMonth; i++) {
          this.daysPaddingPost.push({ date: addDays(addMonths(startOfMonth(this.date), 1), i), events: [] });
        }

        // Edge case when a month has 28 days and begins on Sunday, we don't need any post padding days.
        if (daysBeforeMonth == 0 && endOfMonth(this.date).getDay() == 28) {
          this.daysPaddingPost = []
        }

        // Update the calendar style to account for the number of week rows
        this.calendarStyle = {
          'grid-template-rows': 'repeat(' + (daysMonth + daysBeforeMonth + daysAfterMonth) / 7 + ', 75px)'
        }

        break;
    }

    this.injectEvents();

    if (clickedDay)
      this.setDayActive(clickedDay);
  }

  injectEvents(): void {
    let allDays = this.daysPaddingPre.concat(this.days, this.daysPaddingPost);
    var i = this.events.length;

    while (i--) {
      allDays.forEach(day => {

        if (isWithinInterval(endOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate}) || 
            isWithinInterval(startOfDay(day.date), {start: this.events[i].startDate, end: this.events[i].endDate})) { 

          day.events.push(this.events[i]);

          if (day.events.length > this.eventRows)
              this.eventRows = day.events.length;
        } 
      });
    }
  }

  toggleView(): void {
    // TODO: Add back in the Day view.
    if (this.view == CalendarView.Month) {
      this.view = CalendarView.Week
    }
    else if (this.view == CalendarView.Week) {
      this.view = CalendarView.Month;
    }
    this.buildView();
  }

  navigateCalendar(interval: number = 1, clickedDay: ICalendarDay | undefined = undefined): void {
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

  dayClick(day: ICalendarDay): void {
    const diff = this.view === CalendarView.Month ? differenceInCalendarMonths(day.date, this.date) : (this.view === CalendarView.Week ? differenceInCalendarWeeks(day.date, this.date) : differenceInCalendarDays(day.date, this.date));
    if (diff !== 0) {
      this.activeDayIndex = -1;
      this.navigateCalendar(diff, day);
    }

    this.setDayActive(day);
  }

  setDayActive(day: ICalendarDay) {
    for (let i = 0; i < this.days.length; i++) {
      if (day.date === this.days[i].date) {
        this.activeDayIndex = this.activeDayIndex === i ? -1 : i;
        break;
      }
    }
  }
}