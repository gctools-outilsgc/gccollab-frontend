import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash.component';
import { SplashRoutingModule } from './splash-routing.module';
import { PublicModule } from 'src/app/public/public.module';

@NgModule({
  declarations: [
    SplashComponent
  ],
  imports: [
    CommonModule,
    SplashRoutingModule,
    PublicModule
  ]
})
export class SplashModule { }
