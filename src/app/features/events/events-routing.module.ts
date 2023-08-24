import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';

import { Translations } from 'src/app/core/services/translations.service';
import { EventComponent } from './components/event/event.component';
import { Banner } from 'src/app/shared/components/banner/banner.component';
import { EventResolver } from './resolvers/event.resolver';

let translations = Translations.getInstance();

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsComponent
  },
  {
    path: ':id',
    title: translations.titles.event,
    component: EventComponent,
    // resolve: {
    //   event: EventResolver
    // },
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