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
  @Input({required: true}) nextCalendarHour: ICalendarDate = { date: new Date(), events: [] };
  @Input() eventRows: number = 0;
  @Input() loading: boolean = false;
  @Input() outline: boolean = false;

  currentDay: boolean = false;
  eventStyles: IEventStyle[] = [];

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

    const sortEvents = (events: ICalendarEvent[]) => events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    this.calendarHour.events = sortEvents(this.calendarHour.events);

    const sortedEvents = [...this.prevCalendarHour.events];

    this.calendarHour.events = sortedEvents.map(event => this.calendarHour.events.find(e => e.startDate === event.startDate)) as ICalendarEvent[];
    this.calendarHour.events = sortEvents(this.calendarHour.events);
  }

  private buildEventStyles(): void {
    this.eventStyles = [];

    let shifted = 0;
    for (let i = 0; i < this.calendarHour.events.length; i++) {
      let diff = 0;

      let prevHourEventIndex = (this.prevCalendarHour.events.findIndex((event: ICalendarEvent) => {
        return event == this.calendarHour.events[i];
      }));
      
      // Get the index difference between the event today and the event yesterday.
      if (this.prevCalendarHour.events.includes(this.calendarHour.events[i])) {
        diff = Math.abs(prevHourEventIndex - i);
      }

      const offset = diff - shifted;
      
      this.eventStyles.push({
        'width': this.eventWidth,
        'background-color': this.calendarHour.events[i].color,
        'margin-left': `calc(${offset} * (${this.eventWidth} + ${this.eventGap}))`
      });

      // Keep track of the number of times we shifted for the event to line up.
      if (diff > 0) 
        shifted++;
    }
  }
}

interface IEventStyle {
  'width': string;
  'background-color': string;
  'margin-left': string;
}