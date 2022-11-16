import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { SplashComponent } from './components/splash/splash.component';


@NgModule({
  declarations: [
    PublicComponent,
    AboutComponent,
    SplashComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
