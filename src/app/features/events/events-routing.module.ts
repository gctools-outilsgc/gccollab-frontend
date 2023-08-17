import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';

import { Translations } from 'src/app/core/services/translations.service';
import { EventComponent } from './components/event/event.component';
let translations = Translations.getInstance();

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsComponent
  },
  {
    path: ':eventId',
    title: translations.titles.event,
    component: EventComponent,
    data: {
      title: translations.titles.event, 
      breadcrumb: translations.titles.event
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
