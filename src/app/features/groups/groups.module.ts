import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { MatCardModule } from '@angular/material/card';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupComponent } from './components/group/group.component';


@NgModule({
  declarations: [
    GroupCardComponent,
    GroupListComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule, 
    MatCardModule
  ], 
  exports: [
    GroupListComponent
  ]
})
export class GroupsModule { }
