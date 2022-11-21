import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'home',
  },
  {
    path: 'login',
    title: 'ROUTE.LOGIN',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
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
