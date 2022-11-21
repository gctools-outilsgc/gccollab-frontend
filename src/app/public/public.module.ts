import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { SplashComponent } from './components/splash/splash.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    AboutComponent,
    SplashComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class PublicModule { }
