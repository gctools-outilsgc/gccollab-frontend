import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, IterableDiffer, DoCheck, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';

@Component({
  selector: 'app-calendar-search',
  templateUrl: './calendar-search.component.html',
  styleUrls: ['./calendar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSearchComponent implements OnInit, OnDestroy, DoCheck {
  @Input({ required: true }) events: Event[] = [];
  @Input() model: ICalendarSearchForm = {
    calendarSearch: ''
  };

  form: FormGroup = new FormGroup({});
  formWatchSub!: Subscription;

  filteredEvents: Event[] = [];

  private iterableDifferEvents: IterableDiffer<Event>;
  
  constructor(private iterableDiffers: IterableDiffers,
              private changeDetectorRef: ChangeDetectorRef) {
    this.iterableDifferEvents = iterableDiffers.find(this.events).create();
  }

  ngOnInit(): void {
    // Setup form controls
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        this.form.addControl(key, new FormControl(value, /*[Validators.required]*/));
      } else {
        this.form.controls[key].setValue(value);
      }
    }

    // Watch for search string changes
    this.formWatchSub = this.form.valueChanges.subscribe((value) => {
      this.search(value['calendarSearch'])
    });

    this.onEventsChange();
    this.filteredEvents = this.events;
    this.filteredEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  ngDoCheck() {
    if (this.iterableDifferEvents.diff(this.events)) {
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy(): void {
    if (this.formWatchSub) 
      this.formWatchSub.unsubscribe();
  }

  private search(value: string): void {

    this.filteredEvents = [];
    value = value.toLowerCase().trim();

    for ( let i = 0; i < this.events.length; i++) {
      if (this.events[i].title.toLowerCase().includes(value) ||
          this.events[i].description.toLowerCase().includes(value) ||
          this.events[i].eventType.toLowerCase().includes(value)
         ) {
        this.filteredEvents.push(this.events[i]);
      }
    }

    this.filteredEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  private onEventsChange() {
    
  }
}

interface ICalendarSearchForm {
  calendarSearch: string
}