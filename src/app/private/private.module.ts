import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PrivateComponent } from './private.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
