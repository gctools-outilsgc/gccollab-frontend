import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PrivateComponent } from './private.component';


@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
