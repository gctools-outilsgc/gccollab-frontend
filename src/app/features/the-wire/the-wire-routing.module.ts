import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheWireComponent } from './the-wire.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TheWireComponent
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
export class TheWireRoutingModule { }
