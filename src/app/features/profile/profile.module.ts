import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileListComponent } from './components/profile-list/profile-list.component';


@NgModule({
  declarations: [
    ProfileCardComponent,
    ProfileListComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatCardModule
  ],
  exports: [
    ProfileCardComponent,
    ProfileListComponent
  ]
})
export class ProfileModule { }
