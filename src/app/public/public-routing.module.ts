import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/guards/login.guard';
import { CoreRoutes } from '../core/models/routes';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CoreRoutes.Login,
  },
  {
    path: CoreRoutes.Login,
    title: 'ROUTE.PUBLIC.LOGIN',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: LoginComponent // TODO: update with 404 component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
