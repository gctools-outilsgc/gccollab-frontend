import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash.component';
import { SplashRoutingModule } from './splash-routing.module';
import { PublicModule } from 'src/app/public/public.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SplashComponent
  ],
  imports: [
    CommonModule,
    SplashRoutingModule,
    PublicModule,
    SharedModule
  ]
})
export class SplashModule { }
