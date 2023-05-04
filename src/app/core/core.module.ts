import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfigModule } from './auth/auth.module';

import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TypescriptLoader } from './helpers/typescript-loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthConfigModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    }),
  ],
  exports: [
    TranslateModule,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: CoreModule,
      providers: [] // share state with providers (one instance)
    }
  }
}
