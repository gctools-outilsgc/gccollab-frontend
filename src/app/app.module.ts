import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxTranslateRoutesModule } from 'ngx-translate-routes';

import { AuthInterceptor } from 'angular-auth-oidc-client';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TitleService } from './core/services/title.service';
import { TitleStrategy } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { SearchComponent } from './features/search/search.component';
import { SearchModule } from './features/search/search.module';
import { NewsFeedComponent } from './features/news-feed/news-feed.component';
import { NewsFeedModule } from './features/news-feed/news-feed.module';
import { TheWireComponent } from './features/the-wire/the-wire.component';
import { TheWireModule } from './features/the-wire/the-wire.module';
import { GroupsComponent } from './features/groups/groups.component';
import { GroupsModule } from './features/groups/groups.module';
import { MembersComponent } from './features/members/members.component';
import { MembersModule } from './features/members/members.module';
import { MissionsComponent } from './features/missions/missions.component';
import { MissionsModule } from './features/missions/missions.module';
import { BlogComponent } from './features/blog/blog.component';
import { BlogModule } from './features/blog/blog.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ProfileComponent } from './features/profile/profile.component';
import { ProfileModule } from './features/profile/profile.module';
import { SettingsComponent } from './features/settings/settings.component';
import { SettingsModule } from './features/settings/settings.module';
import { MessagesComponent } from './features/messages/messages.component';
import { MessagesModule } from './features/messages/messages.module';
import { FriendsComponent } from './features/friends/friends.component';
import { FriendsModule } from './features/friends/friends.module';
import { BookmarksComponent } from './features/bookmarks/bookmarks.component';
import { BookmarksModule } from './features/bookmarks/bookmarks.module';
import { InviteComponent } from './features/invite/invite.component';
import { InviteModule } from './features/invite/invite.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NewsFeedComponent,
    TheWireComponent,
    GroupsComponent,
    MembersComponent,
    MissionsComponent,
    BlogComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
    MessagesComponent,
    FriendsComponent,
    BookmarksComponent,
    InviteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    NgxTranslateRoutesModule.forRoot({
      enableRouteTranslate: true,
      enableTitleTranslate: false
    }),
    SharedModule.forRoot(),
    SearchModule,
    NewsFeedModule,
    TheWireModule,
    GroupsModule,
    MembersModule,
    MissionsModule,
    BlogModule,
    DashboardModule,
    ProfileModule,
    SettingsModule,
    MessagesModule,
    FriendsModule,
    BookmarksModule,
    InviteModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    { 
      provide: TitleStrategy, 
      useClass: TitleService 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}