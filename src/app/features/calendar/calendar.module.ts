import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarComponent } from './calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';
import { CalendarSearchComponent } from './components/calendar-search/calendar-search.component';
import { EventsModule } from '../events/events.module';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarComponent, CalendarDayComponent, CalendarEventsComponent, CalendarSearchComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, EventsModule, MatCardModule, MatExpansionModule, MatSlideToggleModule, MatSelectModule, MatPaginatorModule],
  exports: [CalendarComponent],
})
export class CalendarModule {}
