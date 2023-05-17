import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {MatCardModule} from '@angular/material/card';

import { NewsCardComponent } from './components/news-card/news-card.component';



@NgModule({
  declarations: [
    NewsCardComponent
  ],
  imports: [
    CommonModule,
    NewsFeedRoutingModule,
    SharedModule,
    MatCardModule
  ],
  exports: [
    NewsCardComponent
  ]
})
export class NewsFeedModule { }
