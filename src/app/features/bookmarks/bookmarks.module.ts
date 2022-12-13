import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { PrivateModule } from 'src/app/private/private.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    PrivateModule,
    SharedModule
  ]
})
export class BookmarksModule { }
