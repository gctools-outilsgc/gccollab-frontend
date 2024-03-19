import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, IterableDiffer, DoCheck, ChangeDetectorRef, IterableDiffers, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/features/events/models/event';
import { DebounceService } from 'src/app/core/services/debounce.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatAccordion } from '@angular/material/expansion';
//import { isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Translations } from 'src/app/core/services/translations.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar-search',
  templateUrl: './calendar-search.component.html',
  styleUrls: ['./calendar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSearchComponent implements OnInit, OnDestroy, DoCheck {
  @Input({ required: true }) date: Date = new Date();
  @Input({ required: true }) events: Event[] = [];
  @Input() model: ICalendarSearchForm = {
    calendarSearch: '',
  };
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  search: string = this.model.calendarSearch;
  form: FormGroup = new FormGroup({});
  formWatchSub!: Subscription;

  filteredEvents: Event[] = [];
  pagedEvents: Event[] = [];
  showAll: boolean = false;

  private iterableDifferEvents: IterableDiffer<Event>;
  langChangeSub!: Subscription;

  // TODO: Paginate the accordion items. mat-paginator?
  constructor(
    public translations: Translations,
    private iterableDiffers: IterableDiffers,
    private changeDetectorRef: ChangeDetectorRef,
    private debouncerService: DebounceService,
    private paginatorIntl: MatPaginatorIntl,
    private translateService: TranslateService
  ) {
    this.iterableDifferEvents = iterableDiffers.find(this.events).create();
  }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.model)) {
      if (!this.form.controls[key]) {
        this.form.addControl(key, new FormControl(value /*[Validators.required]*/));
      } else {
        this.form.controls[key].setValue(value);
      }
    }

    this.formWatchSub = this.form.valueChanges.subscribe(value => {
      this.debouncerService.debounce(() => {
        this.search = value['calendarSearch'];
        this.searchEvents(this.search);
      }, 300);
    });

    this.langChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.translatePaginator();
    });

    this.translatePaginator();
    this.onEventsChange();
  }

  ngDoCheck() {
    if (this.iterableDifferEvents.diff(this.events)) {
      this.changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy(): void {
    if (this.formWatchSub) this.formWatchSub.unsubscribe();

    if (this.langChangeSub) this.langChangeSub.unsubscribe();
  }

  setShowAll(change: MatSlideToggleChange): void {
    this.showAll = change.checked;

    if (this.showAll) {
      this.filteredEvents = this.events;
      this.filteredEvents.sort(this.sortFn);

      this.pageEvent({
        pageIndex: this.paginator.pageIndex,
        previousPageIndex: undefined,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length,
      });
    } else {
      this.searchEvents(this.search);
    }

    this.accordion.closeAll();
  }

  pageEvent(pageEvent: PageEvent): void {
    const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    const endIndex = startIndex + pageEvent.pageSize;
    this.pagedEvents = this.filteredEvents.slice(startIndex, endIndex);
    this.accordion.closeAll();
  }

  // TODO: If show all off, only search for the selected month's events
  private searchEvents(value: string): void {
    this.showAll = false;
    this.filteredEvents = [];
    value = value.toLowerCase().trim();

    if (value !== '') {
      for (let i = 0; i < this.events.length; i++) {
        // if (this.showAll === false && !isWithinInterval(startOfMonth(this.date), {start: startOfMonth(this.events[i].startDate), end: endOfMonth(this.events[i].endDate)}))
        //   continue;

        if (
          this.events[i].title.toLowerCase().includes(value) ||
          this.events[i].organizer.toLowerCase().includes(value) ||
          this.events[i].eventType.toLowerCase().includes(value) ||
          this.events[i].description.toLowerCase().includes(value)
        ) {
          this.filteredEvents.push(this.events[i]);
        }
      }
      this.filteredEvents.sort(this.sortFn);
    }

    this.pageEvent({
      pageIndex: this.paginator.pageIndex,
      previousPageIndex: undefined,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });

    this.changeDetectorRef.markForCheck();
  }

  private onEventsChange() {
    // What do we need to do here?
  }

  private translatePaginator(): void {
    this.paginatorIntl.itemsPerPageLabel = this.translateService.instant(this.translations.calendar.paginator.items_per_page);
    this.paginatorIntl.nextPageLabel = this.translateService.instant(this.translations.calendar.paginator.next_page);
    this.paginatorIntl.previousPageLabel = this.translateService.instant(this.translations.calendar.paginator.prev_page);
    this.paginatorIntl.firstPageLabel = this.translateService.instant(this.translations.calendar.paginator.first_page);
    this.paginatorIntl.lastPageLabel = this.translateService.instant(this.translations.calendar.paginator.last_page);
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this, this.translateService.instant(this.translations.calendar.paginator.range_label));
    this.paginatorIntl.changes.next();
  }

  private getRangeLabel(translation: string, page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 ${translation
        .replace('{{ start }}', '1')
        .replace('{{ end }}', '0')
        .replace('{{ total }}', '' + length)}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return translation
      .replace('{{ start }}', '' + (startIndex + 1))
      .replace('{{ end }}', '' + endIndex)
      .replace('{{ total }}', '' + length);
  }

  private sortFn = (a: Event, b: Event) => a.startDate.getTime() - b.startDate.getTime();
}

interface ICalendarSearchForm {
  calendarSearch: string;
}
