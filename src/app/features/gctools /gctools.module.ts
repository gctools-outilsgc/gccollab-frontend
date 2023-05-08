import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GCtoolsRoutingModule } from './gctools-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GCtoolsRoutingModule,
    SharedModule
  ]
})
export class GCtoolsModule { }
