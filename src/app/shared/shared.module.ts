import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NGX_EDITOR_CONFIG_TOKEN, NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './components/editor/editor.component';
import { ngxEditorConfigFactory } from './factories/editor-config.factory';
import { TypescriptLoader } from '../core/helpers/typescript-loader';
import { Translations } from '../core/services/translations.service';
import { ButtonComponent } from './components/button/button.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';


@NgModule({
  declarations: [
    LanguageSelectorComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    EditorComponent,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent, 
    BannerComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    NgxEditorModule.forChild(),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
  ],
  exports: [
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent,
    LanguageSelectorComponent,
    EditorComponent,
    ButtonComponent, 
    BannerComponent,
  ],
  providers: [
    {
      useFactory: ngxEditorConfigFactory,
      provide: NGX_EDITOR_CONFIG_TOKEN,
      deps: [TranslateService, Translations],
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