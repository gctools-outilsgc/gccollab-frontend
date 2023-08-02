import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule, 
    MatCardModule
  ], 
  exports: [
    GroupCardComponent
  ]
})
export class GroupsModule { }
