import { ChangeDetectionStrategy, Component, Input, IterableDiffer, IterableDiffers, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';
import { ICalendarDate } from '../../interfaces/calendar-date.interface';
import { CoreRoutes } from 'src/app/core/constants/routes.constants';
import { isSameDay, isSameHour, isWithinInterval, startOfHour, endOfHour} from 'date-fns';

@Component({
  selector: 'app-calendar-hour',
  templateUrl: './calendar-hour.component.html',
  styleUrls: ['./calendar-hour.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarHourComponent implements OnInit {
  @Input({required: true}) calendarHour: ICalendarDate = { date: new Date(), events: [] };
  @Input({required: true}) prevCalendarHour: ICalendarDate = { date: new Date(), events: [] };
  @Input() eventRows: number = 0;
  @Input() loading: boolean = false;
  @Input() outline: boolean = false;

  currentDay: boolean = false;
  eventStyles: IEventStyle[] = [];
  eventOffsets: string = '0px';

  private iterableDifferEvents: IterableDiffer<ICalendarEvent>;

  private eventWidth = '5%';
  private eventGap = '2px';

  constructor(private iterableDiffers: IterableDiffers, 
              private router: Router) { 
    this.iterableDifferEvents = iterableDiffers.find(this.calendarHour.events).create();
  }

  ngOnInit(): void { 
    this.currentDay = isSameDay(this.calendarHour.date, new Date()) && isSameHour(this.calendarHour.date, new Date());
  }

  ngDoCheck() {
    if (this.iterableDifferEvents.diff(this.calendarHour.events)) {
      this.sortEvents();
      this.buildEventStyles();
    }
  }

  routeToEvent(eventId: string, event: MouseEvent | KeyboardEvent) {
    if (eventId && (event.type === 'click' || (event instanceof KeyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space')))) 
      this.router.navigateByUrl(CoreRoutes.Events + '/' + eventId);
  }

  private sortEvents(): void {
    this.calendarHour.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    this.calendarHour.events.reverse();
  }

  private buildEventStyles(): void {
    this.eventStyles = [];

    for (let i = 0; i < this.calendarHour.events.length; i++) {
      this.eventStyles.push({
        'width': this.eventWidth,
        'background-color': this.calendarHour.events[i].color
      });
    }

    if (this.calendarHour.events.length < this.eventRows) {
      let diff = Math.abs(this.calendarHour.events.length - this.eventRows);
      this.eventOffsets = `calc(${diff} * (${this.eventWidth} + ${this.eventGap}))`;
    }
  }
}

interface IEventStyle {
  'width': string;
  'background-color': string;
}