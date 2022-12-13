import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { PrivateModule } from 'src/app/private/private.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    PrivateModule,
    SharedModule
  ]
})
export class GroupsModule { }
