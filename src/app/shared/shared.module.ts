import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule, HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NGX_EDITOR_CONFIG_TOKEN, NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './components/editor/editor.component';
import { ngxEditorConfigFactory } from './factories/editor-config.factory';
import { TypescriptLoader } from '../core/helpers/typescript-loader';


@NgModule({
  declarations: [
    LanguageSelectorComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    }),
    NgxEditorModule.forChild()
  ],
  exports: [
    TranslateModule,
    LanguageSelectorComponent,
    EditorComponent
  ],
  providers: [
    {
      useFactory: ngxEditorConfigFactory,
      provide: NGX_EDITOR_CONFIG_TOKEN,
      deps: [TranslateService],
    }
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