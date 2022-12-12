import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms-routing.module';
import { PublicModule } from 'src/app/public/public.module';


@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    PublicModule
  ]
})
export class TermsModule { }
