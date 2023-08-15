import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule, 
    MatCardModule
  ], 
  exports: [

  ]
})
export class GroupsModule { }
