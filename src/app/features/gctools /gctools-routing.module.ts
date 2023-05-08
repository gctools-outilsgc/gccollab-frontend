import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GCtoolsComponent } from './gctools.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GCtoolsComponent
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
export class GCtoolsRoutingModule { }
