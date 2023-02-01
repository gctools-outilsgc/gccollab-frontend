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
      breadcrumb: 'titles.login'
    }
  },
  {
    path: CoreRoutes.Home,
    title: 'titles.home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.home'
    }
  },
  {
    path: CoreRoutes.Register,
    title: 'titles.register',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule),
    canActivate: [LoginGuard],
    data: {
      breadcrumb: 'titles.register'
    }
  },
  {
    path: CoreRoutes.Terms,
    title: 'titles.terms',
    loadChildren: () => import('./features/terms/terms.module').then(m => m.TermsModule),
    data: {
      breadcrumb: 'titles.terms'
    }
  },
  {
    path: CoreRoutes.Splash,
    title: 'titles.splash', 
    loadChildren: () => import('./features/splash/splash.module').then(m => m.SplashModule),
    data: {
      breadcrumb: 'titles.splash'
    }
  },
  {
    path: CoreRoutes.About,
    title: 'titles.about', 
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    data: {
      breadcrumb: 'titles.about'
    }
  },
  {
    path: CoreRoutes.Privacy,
    title: 'titles.privacy',
    loadChildren: () => import('./features/privacy/privacy.module').then(m => m.PrivacyModule),
    data: {
      breadcrumb: 'titles.privacy'
    }
  },
  {
    path: CoreRoutes.Stats,
    title: 'titles.stats',
    loadChildren: () => import('./features/stats/stats.module').then(m => m.StatsModule),
    data: {
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
      breadcrumb: 'titles.blog'
    }
  },
  {
    path: CoreRoutes.Bookmarks,
    title: 'titles.bookmarks',
    loadChildren: () => import('./features/bookmarks/bookmarks.module').then(m => m.BookmarksModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.bookmarks'
    }
  },
  {
    path: CoreRoutes.Dashboard,
    title: 'titles.dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.dashboard'
    }
  },
  {
    path: CoreRoutes.Friends,
    title: 'titles.friends',
    loadChildren: () => import('./features/friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.friends'
    }
  },
  {
    path: CoreRoutes.Groups,
    title: 'titles.groups',
    loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.groups'
    }
  },
  {
    path: CoreRoutes.Invite,
    title: 'titles.invite',
    loadChildren: () => import('./features/invite/invite.module').then(m => m.InviteModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.invite'
    }
  },
  {
    path: CoreRoutes.Members,
    title: 'titles.members',
    loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.members'
    }
  },
  {
    path: CoreRoutes.Messages,
    title: 'titles.messages',
    loadChildren: () => import('./features/messages/messages.module').then(m => m.MessagesModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.messages'
    }
  },
  {
    path: CoreRoutes.Missions,
    title: 'titles.missions',
    loadChildren: () => import('./features/missions/missions.module').then(m => m.MissionsModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.missions'
    }
  },
  {
    path: CoreRoutes.NewsFeed,
    title: 'titles.newsfeed',
    loadChildren: () => import('./features/news-feed/news-feed.module').then(m => m.NewsFeedModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.newsfeed'
    }
  },
  {
    path: CoreRoutes.Profile,
    title: 'titles.profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.profile'
    }
  },
  {
    path: CoreRoutes.Search,
    title: 'titles.search',
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.search'
    }
  },
  {
    path: CoreRoutes.Settings,
    title: 'titles.settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.settings'
    }
  },
  {
    path: CoreRoutes.TheWire,
    title: 'titles.thewire',
    loadChildren: () => import('./features/the-wire/the-wire.module').then(m => m.TheWireModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'titles.thewire'
    }
  },
  {
    path: CoreRoutes.Unauthorized,
    title: 'titles.unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: CoreRoutes.Forbidden,
    title: 'titles.forbidden',
    component: ForbiddenComponent
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
