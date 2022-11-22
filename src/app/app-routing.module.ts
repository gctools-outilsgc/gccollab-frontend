import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutes } from './core/models/routes';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: CoreRoutes.Home,
  },
  {
    path: CoreRoutes.Login,
    title: 'ROUTE.LOGIN',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    canActivate: [LoginGuard]
  },
  {
    path: CoreRoutes.Home,
    title: 'ROUTE.HOME',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
