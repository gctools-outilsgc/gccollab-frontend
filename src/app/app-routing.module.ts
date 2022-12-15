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
    title: 'titles.login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: CoreRoutes.Home,
    title: 'titles.home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Register,
    title: 'titles.register',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule),
    canActivate: [LoginGuard],
  },
  {
    path: CoreRoutes.Terms,
    title: 'titles.terms',
    loadChildren: () => import('./features/terms/terms.module').then(m => m.TermsModule),
  },
  {
    path: CoreRoutes.Splash,
    title: 'titles.splash', 
    loadChildren: () => import('./features/splash/splash.module').then(m => m.SplashModule),
  },
  {
    path: CoreRoutes.About,
    title: 'titles.about', 
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
  },
  {
    path: CoreRoutes.Privacy,
    title: 'titles.privacy',
    loadChildren: () => import('./features/privacy/privacy.module').then(m => m.PrivacyModule)
  },
  {
    path: CoreRoutes.Stats,
    title: 'titles.stats',
    loadChildren: () => import('./features/stats/stats.module').then(m => m.StatsModule)
  },
  {
    path: CoreRoutes.Help,
    title: 'titles.help',
    component: RedirectGuard,
    canActivate: [RedirectGuard],
    data: {
      externalUrl: 'https://support.gccollab.ca/en/support/home'
    }
  },
  {
    path: CoreRoutes.Blog,
    title: 'titles.blog',
    loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Bookmarks,
    title: 'titles.bookmarks',
    loadChildren: () => import('./features/bookmarks/bookmarks.module').then(m => m.BookmarksModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Dashboard,
    title: 'titles.dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Friends,
    title: 'titles.friends',
    loadChildren: () => import('./features/friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Groups,
    title: 'titles.groups',
    loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Invite,
    title: 'titles.invite',
    loadChildren: () => import('./features/invite/invite.module').then(m => m.InviteModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Members,
    title: 'titles.members',
    loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Messages,
    title: 'titles.messages',
    loadChildren: () => import('./features/messages/messages.module').then(m => m.MessagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Missions,
    title: 'titles.missions',
    loadChildren: () => import('./features/missions/missions.module').then(m => m.MissionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.NewsFeed,
    title: 'titles.newsfeed',
    loadChildren: () => import('./features/news-feed/news-feed.module').then(m => m.NewsFeedModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Profile,
    title: 'titles.profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Search,
    title: 'titles.search',
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.Settings,
    title: 'titles.settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: CoreRoutes.TheWire,
    title: 'titles.thewire',
    loadChildren: () => import('./features/the-wire/the-wire.module').then(m => m.TheWireModule),
    canActivate: [AuthGuard]
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
