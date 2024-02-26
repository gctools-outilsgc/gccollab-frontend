import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatCardModule } from '@angular/material/card';

import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsListComponent } from './components/news-list/news-list.component';

@NgModule({
  declarations: [NewsCardComponent, NewsListComponent],
  imports: [CommonModule, NewsFeedRoutingModule, SharedModule, MatCardModule],
  exports: [NewsCardComponent, NewsListComponent],
})
export class NewsFeedModule {}
