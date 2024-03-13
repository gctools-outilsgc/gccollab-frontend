import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, IterableDiffer, DoCheck, ChangeDetectorRef, IterableDiffers, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';
import { DebounceService } from 'src/app/core/services/debounce.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatAccordion } from '@angular/material/expansion';

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
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  search: string = this.model.calendarSearch;
  form: FormGroup = new FormGroup({});
  formWatchSub!: Subscription;

  filteredEvents: Event[] = [];
  showAll: boolean = false;

  private iterableDifferEvents: IterableDiffer<Event>;
  
  
  constructor(private iterableDiffers: IterableDiffers,
              private changeDetectorRef: ChangeDetectorRef,
              private debouncerService: DebounceService) {
    this.iterableDifferEvents = iterableDiffers.find(this.events).create();
  }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        this.form.addControl(key, new FormControl(value, /*[Validators.required]*/));
      } else {
        this.form.controls[key].setValue(value);
      }
    }

    this.formWatchSub = this.form.valueChanges.subscribe((value) => {
      this.debouncerService.debounce(() => {
        this.search = value['calendarSearch'];
        this.searchEvents(this.search);
      }, 300);
    });

    this.onEventsChange();
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

  setShowAll(change: MatSlideToggleChange): void {
    this.showAll = change.checked;

    if (this.showAll) {
      this.filteredEvents = this.events;
      this.filteredEvents.sort(this.sortFn);
    }
    else {
      this.searchEvents(this.search);
    }
    
    this.accordion.closeAll();
  }

  private searchEvents(value: string): void {
    this.showAll = false;
    this.filteredEvents = [];
    value = value.toLowerCase().trim();

    if (value !== "") {
      for ( let i = 0; i < this.events.length; i++) {
        if (this.events[i].title.toLowerCase().includes(value) ||
            this.events[i].organizer.toLowerCase().includes(value) ||
            this.events[i].eventType.toLowerCase().includes(value) ||
            this.events[i].description.toLowerCase().includes(value)
           ) {
          this.filteredEvents.push(this.events[i]);
        }
      }
      this.filteredEvents.sort(this.sortFn);
    }
    this.changeDetectorRef.markForCheck();
  }

  private onEventsChange() {
    // What do we need to do here?
  }

  private sortFn = (a: Event, b: Event) => a.startDate.getTime() - b.startDate.getTime();
}

interface ICalendarSearchForm {
  calendarSearch: string
}