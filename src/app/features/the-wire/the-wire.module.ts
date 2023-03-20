import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheWireRoutingModule } from './the-wire-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TheWireRoutingModule,
    SharedModule
  ]
})
export class TheWireModule { }
