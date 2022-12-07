import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutes } from './core/models/routes';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { RedirectGuard } from './core/guards/redirect.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CoreRoutes.Home,
  },
  {
    path: CoreRoutes.Login,
    title: 'ROUTE.LOGIN',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: CoreRoutes.Home,
    title: 'ROUTE.HOME',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Register,
    title: 'ROUTE.REGISTER',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule),
    canActivate: [LoginGuard],
  },
  {
    path: CoreRoutes.Terms,
    title: 'ROUTE.TERMS',
    loadChildren: () => import('./features/terms/terms.module').then(m => m.TermsModule),
  },
  {
    path: CoreRoutes.Splash,
    title: 'ROUTE.SPLASH', 
    loadChildren: () => import('./features/splash/splash.module').then(m => m.SplashModule)
  },
  {
    path: CoreRoutes.About,
    title: 'ROUTE.ABOUT', 
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
  },
  {
    path: CoreRoutes.Privacy,
    title: 'ROUTE.PRIVACY',
    loadChildren: () => import('./features/privacy/privacy.module').then(m => m.PrivacyModule)
  },
  {
    path: CoreRoutes.Stats,
    title: 'ROUTE.STATS',
    loadChildren: () => import('./features/stats/stats.module').then(m => m.StatsModule)
  },
  {
    path: CoreRoutes.Help,
    title: 'ROUTE.HELP',
    component: RedirectGuard,
    canActivate: [RedirectGuard],
    data: {
      externalUrl: 'https://support.gccollab.ca/en/support/home'
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
