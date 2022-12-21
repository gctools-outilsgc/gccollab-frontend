import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppModule, HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';


@NgModule({
  declarations: [
    LanguageSelectorComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    }),
  ],
  exports: [
    TranslateModule,
    LanguageSelectorComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: SharedModule,
      providers: [] // share state with providers (one instance)
    }
  }
 }

 // https://stackoverflow.com/questions/53413612/ngx-translate-with-shared-lazy-loading-modules/53483123#53483123