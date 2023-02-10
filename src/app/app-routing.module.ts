import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutes } from './core/models/routes';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { RedirectGuard } from './core/guards/redirect.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CoreRoutes.Home
  },
  {
    path: CoreRoutes.Login,
    title: 'titles.login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
    data: {
      title: 'titles.login',
      breadcrumb: 'titles.login'
    }
  },
  {
    path: CoreRoutes.Home,
    title: 'titles.home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.home',
      breadcrumb: 'titles.home'
    }
  },
  {
    path: CoreRoutes.Register,
    title: 'titles.register',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule),
    canActivate: [LoginGuard],
    data: {
      title: 'titles.register',
      breadcrumb: 'titles.register'
    }
  },
  {
    path: CoreRoutes.Terms,
    title: 'titles.terms',
    loadChildren: () => import('./features/terms/terms.module').then(m => m.TermsModule),
    data: {
      title: 'titles.terms',
      breadcrumb: 'titles.terms'
    }
  },
  {
    path: CoreRoutes.Splash,
    title: 'titles.splash', 
    loadChildren: () => import('./features/splash/splash.module').then(m => m.SplashModule),
    data: {
      title: 'titles.splash',
      breadcrumb: 'titles.splash'
    }
  },
  {
    path: CoreRoutes.About,
    title: 'titles.about', 
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    data: {
      title: 'titles.about',
      breadcrumb: 'titles.about'
    }
  },
  {
    path: CoreRoutes.Privacy,
    title: 'titles.privacy',
    loadChildren: () => import('./features/privacy/privacy.module').then(m => m.PrivacyModule),
    data: {
      title: 'titles.privacy',
      breadcrumb: 'titles.privacy'
    }
  },
  {
    path: CoreRoutes.Stats,
    title: 'titles.stats',
    loadChildren: () => import('./features/stats/stats.module').then(m => m.StatsModule),
    data: {
      title: 'titles.stats',
      breadcrumb: 'titles.stats'
    }
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
    canActivate: [AuthGuard],
    data: {
      title: 'titles.blog',
      breadcrumb: 'titles.blog'
    }
  },
  {
    path: CoreRoutes.Bookmarks,
    title: 'titles.bookmarks',
    loadChildren: () => import('./features/bookmarks/bookmarks.module').then(m => m.BookmarksModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.bookmarks',
      breadcrumb: 'titles.bookmarks'
    }
  },
  {
    path: CoreRoutes.Dashboard,
    title: 'titles.dashboards',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.dashboards',
      breadcrumb: 'titles.dashboards'
    }
  },
  {
    path: CoreRoutes.Friends,
    title: 'titles.friends',
    loadChildren: () => import('./features/friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.friends',
      breadcrumb: 'titles.friends'
    }
  },
  {
    path: CoreRoutes.Groups,
    title: 'titles.groups',
    loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.groups',
      breadcrumb: 'titles.groups'
    }
  },
  {
    path: CoreRoutes.Invite,
    title: 'titles.invite',
    loadChildren: () => import('./features/invite/invite.module').then(m => m.InviteModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.invite',
      breadcrumb: 'titles.invite'
    }
  },
  {
    path: CoreRoutes.Members,
    title: 'titles.members',
    loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.members',
      breadcrumb: 'titles.members'
    }
  },
  {
    path: CoreRoutes.Messages,
    title: 'titles.messages',
    loadChildren: () => import('./features/messages/messages.module').then(m => m.MessagesModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.messages',
      breadcrumb: 'titles.messages'
    }
  },
  {
    path: CoreRoutes.Missions,
    title: 'titles.missions',
    loadChildren: () => import('./features/missions/missions.module').then(m => m.MissionsModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.missions',
      breadcrumb: 'titles.missions'
    }
  },
  {
    path: CoreRoutes.NewsFeed,
    title: 'titles.newsfeed',
    loadChildren: () => import('./features/news-feed/news-feed.module').then(m => m.NewsFeedModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.newsfeed',
      breadcrumb: 'titles.newsfeed'
    }
  },
  {
    path: CoreRoutes.Profile,
    title: 'titles.profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.profile',
      breadcrumb: 'titles.profile'
    }
  },
  {
    path: CoreRoutes.Search,
    title: 'titles.search',
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.search',
      breadcrumb: 'titles.search'
    }
  },
  {
    path: CoreRoutes.Settings,
    title: 'titles.settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.settings',
      breadcrumb: 'titles.settings'
    }
  },
  {
    path: CoreRoutes.TheWire,
    title: 'titles.thewire',
    loadChildren: () => import('./features/the-wire/the-wire.module').then(m => m.TheWireModule),
    canActivate: [AuthGuard],
    data: {
      title: 'titles.thewire',
      breadcrumb: 'titles.thewire'
    }
  },
  {
    path: CoreRoutes.Unauthorized,
    title: 'titles.unauthorized',
    component: UnauthorizedComponent,
    data: {
      title: 'titles.unauthorized',
      breadcrumb: 'titles.unauthorized'
    }
  },
  {
    path: CoreRoutes.Forbidden,
    title: 'titles.forbidden',
    component: ForbiddenComponent,
    data: {
      title: 'titles.forbidden',
      breadcrumb: 'titles.forbidden'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'titles.notfound',
      breadcrumb: 'titles.notfound'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
