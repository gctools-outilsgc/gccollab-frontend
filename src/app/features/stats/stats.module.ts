import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { PublicModule } from 'src/app/public/public.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    PublicModule,
    SharedModule
  ]
})
export class StatsModule { }
