import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheWireRoutingModule } from './the-wire-routing.module';
import { PrivateModule } from 'src/app/private/private.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TheWireRoutingModule,
    PrivateModule,
    SharedModule
  ]
})
export class TheWireModule { }
