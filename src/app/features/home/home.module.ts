import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsFeedModule } from '../news-feed/news-feed.module';
import { GroupsModule } from '../groups/groups.module';
import { EventsModule } from '../events/events.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NewsFeedModule,
    GroupsModule,
    EventsModule,
    ProfileModule,
  ],
})
export class HomeModule {}
