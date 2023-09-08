import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { PostComponent } from './components/post/post.component';


@NgModule({
  declarations: [
    ProfileCardComponent,
    ProfileListComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MatCardModule
  ],
  exports: [
    ProfileCardComponent,
    ProfileListComponent,
    PostComponent
  ]
})
export class ProfileModule { }
