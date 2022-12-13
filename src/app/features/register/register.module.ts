import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { PublicModule } from 'src/app/public/public.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    PublicModule,
    SharedModule
  ]
})
export class RegisterModule { }
