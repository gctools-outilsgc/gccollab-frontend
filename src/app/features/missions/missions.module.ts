import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionsComponent } from './missions.component';


@NgModule({
  declarations: [
    MissionsComponent
  ],
  imports: [
    CommonModule,
    MissionsRoutingModule,
    SharedModule
  ]
})
export class MissionsModule { }
