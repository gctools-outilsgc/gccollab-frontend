import { Component, Input, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, subWeeks, subMonths, addDays, addWeeks, addMonths, endOfMonth, isSameDay, isSameMonth, addHours, getDaysInMonth, startOfWeek, startOfMonth, differenceInCalendarDays, differenceInCalendarWeeks, differenceInCalendarMonths } from 'date-fns';
import { CalendarView } from './interfaces/calendar-view.interface';
import { ICalendarEvent } from './interfaces/calendar-event.interface';
import { ICalendarDay } from './interfaces/calendar-day.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
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

  constructor() {
    this.events.push({ title: 'My Event has a super long annoying title that will probably breakout of the component box and ruin the view of my calendar LOL', startDate: new Date(), endDate: addDays(new Date(), 3) });
  }

  ngOnInit(): void {
    this.buildView();
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

    // TODO: Switch to manual change detection
    if (clickedDay)
      this.setDayActive(clickedDay);
  }

  injectEvents(): void {
    this.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    let eventsInRange: ICalendarEvent[];

    switch(this.view) {
      case CalendarView.Day:
        const targetDay = this.date.getDate();
        eventsInRange = this.events.filter(event => event.startDate.getDate() === targetDay || event.endDate.getDate() === targetDay);
        break;
      case CalendarView.Week:
        const targetWeek = Math.floor((this.date.getDate() - 1) / 7) + 1
        eventsInRange = this.events.filter(event => {
          const weekStartNumber = Math.floor((event.startDate.getDate() - 1) / 7) + 1;
          const weekEndNumber = Math.floor((event.endDate.getDate() - 1) / 7) + 1;
          return weekStartNumber === targetWeek || weekEndNumber === targetWeek;
        });
        break;
      case CalendarView.Month:
        const targetMonth = this.date.getMonth();
        eventsInRange = this.events.filter(event => event.startDate.getMonth() === targetMonth || event.endDate.getMonth() === targetMonth);
        break;
    }

    for (let i = 0; i < this.days.length; i++) {
      for (let c = 0; c < eventsInRange.length; c++) {
        if (isSameDay(eventsInRange[c].startDate, this.days[i].date) || isSameDay(eventsInRange[c].endDate, this.days[i].date))
          this.days[i].events.push(eventsInRange[c]);
      }
    }
  }

  toggleView(): void {
    if (this.view == CalendarView.Month) {
      this.view = CalendarView.Day
    }
    else if (this.view == CalendarView.Week) {
      this.view = CalendarView.Month;
    }
    else {
      this.view = CalendarView.Week;
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