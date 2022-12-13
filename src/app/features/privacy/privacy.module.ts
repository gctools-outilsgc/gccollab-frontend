import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { PublicModule } from 'src/app/public/public.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    PublicModule,
    SharedModule
  ]
})
export class PrivacyModule { }
