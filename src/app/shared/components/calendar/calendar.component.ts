import { Component, Input, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, subWeeks, subMonths, addDays, addWeeks, addMonths, endOfMonth, isSameDay, isSameMonth, addHours, getDaysInMonth, startOfMonth } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() view: CalendarView = CalendarView.Month;
  @Input() date: Date = new Date();

  days: IDay[] = [];
  daysPaddingPre: IDay[] = [];
  daysPaddingPost: IDay[] = [];

  calendarStyle = {
    'grid-template-rows': 'repeat(5, 75px)'
  }

  previousCallback = this.previous.bind(this);
  nextCallback = this.next.bind(this);
  toggleViewCallback = this.toggleView.bind(this);

  CalendarView = CalendarView;

  constructor() {

  }

  ngOnInit(): void {
    this.buildView();
  }

  buildView(): void {
    this.daysPaddingPre = []; 
    this.daysPaddingPost = []
    this.days = [];

    switch(this.view) {
      case CalendarView.Month:

        // Create days for each day of the month
        const days = getDaysInMonth(this.date);
        for (let i = 0 ; i < days; i++) {
          this.days.push({ number: i + 1 });
        }
      
        // Create any days for the previous month that are in the first week row
        const prePadding = startOfMonth(this.date).getDay();
        for (let i = 0 ; i < prePadding; i++) {
          this.daysPaddingPre.push({ number: subDays(startOfMonth(this.date), i + 1).getDate()});
        }
        this.daysPaddingPre.reverse();
      
        // Create any days for the next month that are in the final week row
        const postPadding = (days + prePadding > 35 ? 42 : 35) - days - prePadding;
        for (let i = 0 ; i < postPadding; i++) {
          this.daysPaddingPost.push({ number: i + 1 });
        }

        // Edge case when a month has 28 days and begins on Sunday, we don't need any post padding days.
        if (prePadding == 0 && endOfMonth(this.date).getDay() == 28) {
          this.daysPaddingPost = []
        }

        // Update the calendar style to account for the number of week rows
        this.calendarStyle = {
          'grid-template-rows': 'repeat(' + (days + prePadding + postPadding) / 7 + ', 75px)'
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

interface IDay {
  number: number
}
