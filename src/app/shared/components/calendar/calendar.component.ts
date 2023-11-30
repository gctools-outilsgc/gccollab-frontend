import { Component, Input, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, subWeeks, subMonths, addDays, addWeeks, addMonths, endOfMonth, isSameDay, isSameMonth, addHours, getDaysInMonth, startOfWeek, startOfMonth } from 'date-fns';

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

  previousCallback = this.previous.bind(this);
  nextCallback = this.next.bind(this);
  toggleViewCallback = this.toggleView.bind(this);

  CalendarView = CalendarView;
  dayToday = this.date.getDay();

  constructor() {
    this.events.push({ title: 'My Event', startDate: new Date(), endDate: addDays(new Date(), 3) });
  }

  ngOnInit(): void {
    this.buildView();
  }

  buildView(): void {
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
          this.daysPaddingPost.push({ date: addDays(addMonths(startOfMonth(this.date), 1), i + 1), events: [] });
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

  previous(): void {
    switch(this.view) {
      case CalendarView.Day:
        this.date = subDays(this.date, 1);
        break;
      case CalendarView.Week:
        this.date = subWeeks(this.date, 1);
        break;
      case CalendarView.Month:
        this.date = subMonths(this.date, 1);
        break;
    }
    this.buildView();
  }

  next(): void {
    switch(this.view) {
      case CalendarView.Day:
        this.date = addDays(this.date, 1);
        break;
      case CalendarView.Week:
        this.date = addWeeks(this.date, 1);
        break;
      case CalendarView.Month:
        this.date = addMonths(this.date, 1);
        break;
    }
    this.buildView();
  }
}

enum CalendarView {
  Day = "Day",
  Week = "Week",
  Month = "Month"
}

interface ICalendarDay {
  date: Date;
  events: ICalendarEvent[];
}

interface ICalendarEvent {
  title: string;
  startDate: Date;
  endDate: Date;
}