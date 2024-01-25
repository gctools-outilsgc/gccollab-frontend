import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { MatCardModule } from '@angular/material/card';
import { EventListComponent } from './components/event-list/event-list.component';

@NgModule({
  declarations: [
    EventCardComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    MatCardModule
  ],
  exports: [
    EventCardComponent,
    EventListComponent
  ]
})
export class EventsModule { }
