import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';
import { PublicModule } from 'src/app/public/public.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    PublicModule,
    SharedModule
  ]
})
export class TermsModule { }
