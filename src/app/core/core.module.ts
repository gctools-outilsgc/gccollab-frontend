import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfigModule } from './auth/auth.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { TypescriptLoader } from './helpers/typescript-loader';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageTitleComponent
  ],
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
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exports: [
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent
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
