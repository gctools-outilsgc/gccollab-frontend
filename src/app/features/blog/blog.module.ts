import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PrivateModule } from 'src/app/private/private.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlogRoutingModule,
    PrivateModule,
    SharedModule
  ]
})
export class BlogModule { }
