import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './components/group/group.component';

import { Translations } from 'src/app/core/services/translations.service';
let translations = Translations.getInstance();

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GroupsComponent
  },
  {
    path: ':id',
    title: translations.titles.group,
    component: GroupComponent,
    data: {
      title: translations.titles.group, 
      breadcrumb: translations.titles.group
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
export class GroupsRoutingModule { }
