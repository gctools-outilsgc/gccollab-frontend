import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutes } from './core/constants/routes.constants';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { RedirectGuard } from './core/guards/redirect.guard';
import { InterceptorGuard } from './core/guards/interceptor.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { Translations } from './core/services/translations.service';

let translations = Translations.getInstance();

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CoreRoutes.Home
  },
  {
    path: CoreRoutes.Login,
    title: translations.titles.login,
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
    data: {
      title: translations.titles.login,
      breadcrumb: translations.titles.login
    }
  },
  {
    path: CoreRoutes.Home,
    title: translations.titles.home,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: [InterceptorGuard],
    data: {
      title: translations.titles.home, 
      breadcrumb: translations.titles.home
    }
  },
  {
    path: CoreRoutes.Register,
    title: translations.titles.register,
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule),
    canActivate: [LoginGuard],
    data: {
      title: translations.titles.register,
      breadcrumb: translations.titles.register
    }
  },
  {
    path: CoreRoutes.Terms,
    title: translations.titles.terms,
    loadChildren: () => import('./features/terms/terms.module').then(m => m.TermsModule),
    data: {
      title: translations.titles.terms,
      breadcrumb: translations.titles.terms
    }
  },
  {
    path: CoreRoutes.Splash,
    title: translations.titles.splash, 
    loadChildren: () => import('./features/splash/splash.module').then(m => m.SplashModule),
    data: {
      title: translations.titles.splash,
      breadcrumb: translations.titles.splash
    }
  },
  {
    path: CoreRoutes.About,
    title: translations.titles.about, 
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    data: {
      title: translations.titles.about,
      breadcrumb: translations.titles.about
    }
  },
  {
    path: CoreRoutes.Privacy,
    title: translations.titles.privacy,
    loadChildren: () => import('./features/privacy/privacy.module').then(m => m.PrivacyModule),
    data: {
      title: translations.titles.privacy,
      breadcrumb: translations.titles.privacy
    }
  },
  {
    path: CoreRoutes.Stats,
    title: translations.titles.stats,
    loadChildren: () => import('./features/stats/stats.module').then(m => m.StatsModule),
    data: {
      title: translations.titles.stats,
      breadcrumb: translations.titles.stats
    }
  },
  {
    path: CoreRoutes.Help,
    title: translations.titles.help,
    component: RedirectGuard,
    canActivate: [RedirectGuard],
    data: {
      externalUrl: 'https://support.gccollab.ca/en/support/home'
    }
  },
  {
    path: CoreRoutes.Blog,
    title: translations.titles.blog,
    loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.blog,
      breadcrumb: translations.titles.blog
    }
  },
  {
    path: CoreRoutes.Bookmarks,
    title: translations.titles.bookmarks,
    loadChildren: () => import('./features/bookmarks/bookmarks.module').then(m => m.BookmarksModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.bookmarks,
      breadcrumb: translations.titles.bookmarks
    }
  },
  {
    path: CoreRoutes.Dashboard,
    title: translations.titles.dashboards,
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.dashboards,
      breadcrumb: translations.titles.dashboards
    }
  },
  {
    path: CoreRoutes.Friends,
    title: translations.titles.friends,
    loadChildren: () => import('./features/friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.friends,
      breadcrumb: translations.titles.friends
    }
  },
  {
    path: CoreRoutes.Groups,
    title: translations.titles.groups,
    loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.groups,
      breadcrumb: translations.titles.groups
    }
  },
  {
    path: CoreRoutes.Invite,
    title: translations.titles.invite,
    loadChildren: () => import('./features/invite/invite.module').then(m => m.InviteModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.invite,
      breadcrumb: translations.titles.invite
    }
  },
  {
    path: CoreRoutes.Members,
    title: translations.titles.members,
    loadChildren: () => import('./features/members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.members,
      breadcrumb: translations.titles.members
    }
  },
  {
    path: CoreRoutes.Messages,
    title: translations.titles.messages,
    loadChildren: () => import('./features/messages/messages.module').then(m => m.MessagesModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.messages,
      breadcrumb: translations.titles.messages
    }
  },
  {
    path: CoreRoutes.Missions,
    title: translations.titles.missions,
    loadChildren: () => import('./features/missions/missions.module').then(m => m.MissionsModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.missions,
      breadcrumb: translations.titles.missions
    }
  },
  {
    path: CoreRoutes.NewsFeed,
    title: translations.titles.newsfeed,
    loadChildren: () => import('./features/news-feed/news-feed.module').then(m => m.NewsFeedModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.newsfeed,
      breadcrumb: translations.titles.newsfeed
    }
  },
  {
    path: CoreRoutes.Profile,
    title: translations.titles.profile,
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.profile,
      breadcrumb: translations.titles.profile
    }
  },
  {
    path: CoreRoutes.Search,
    title: translations.titles.search,
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.search,
      breadcrumb: translations.titles.search
    }
  },
  {
    path: CoreRoutes.Settings,
    title: translations.titles.settings,
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.settings,
      breadcrumb: translations.titles.settings
    }
  },
  {
    path: CoreRoutes.TheWire,
    title: translations.titles.thewire,
    loadChildren: () => import('./features/the-wire/the-wire.module').then(m => m.TheWireModule),
    canActivate: [AuthGuard],
    data: {
      title: translations.titles.thewire,
      breadcrumb: translations.titles.thewire
    }
  },
  {
    path: CoreRoutes.Unauthorized,
    title: translations.titles.unauthorized,
    component: UnauthorizedComponent,
    data: {
      title: translations.titles.unauthorized,
      breadcrumb: translations.titles.unauthorized
    }
  },
  {
    path: CoreRoutes.Forbidden,
    title: translations.titles.forbidden,
    component: ForbiddenComponent,
    data: {
      title: translations.titles.forbidden,
      breadcrumb: translations.titles.forbidden
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: translations.titles.notfound,
      breadcrumb: translations.titles.notfound
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
