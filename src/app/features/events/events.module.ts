import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    EventCardComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    MatCardModule
  ],
  exports: [
    EventCardComponent
  ]
})
export class EventsModule { }
