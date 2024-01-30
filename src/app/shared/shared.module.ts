/* eslint-disable no-mixed-spaces-and-tabs */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../app.module';
import { HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NGX_EDITOR_CONFIG_TOKEN, NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './components/editor/editor.component';
import { ngxEditorConfigFactory } from './factories/editor-config.factory';
import { TypescriptLoader } from '../core/helpers/typescript-loader';
import { Translations } from '../core/services/translations.service';
import { ButtonComponent } from './components/button/button.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { InputComponent } from './components/input/input.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { CalendarButtonComponent } from './components/calendar-button/calendar-button.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditorMenuComponent } from './components/editor/menu/editor-menu/editor-menu.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { PollFormComponent } from './components/poll-form/poll-form.component';

import { TruncateFileNamePipe } from './pipes/truncate-file-name/truncate-file-name.pipe';
import { FormControlPipe } from './pipes/form-control/form-control.pipe';
import { FormGroupPipe } from './pipes/form-group/form-group.pipe';
import { FileSelectComponent } from './components/file-select/file-select.component';
import { ListComponent } from './components/list/list.component';

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
    InputComponent,
    BannerComponent,
    ProfilePicComponent,
    CalendarButtonComponent,
    EditorMenuComponent,
    PostFormComponent,
    BlogFormComponent,
    EventFormComponent,
    PollFormComponent,
    TruncateFileNamePipe,
    FormControlPipe,
    FormGroupPipe,
    FileSelectComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
        deps: [HttpClient],
      },
      isolate: false,
      extend: true,
    }),
    NgxEditorModule.forChild({}),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
  ],
  exports: [
    TranslateModule,
    MatTooltipModule,
    HeaderComponent,
    FooterComponent,
    PageTitleComponent,
    LanguageSelectorComponent,
    EditorComponent,
    ButtonComponent,
    InputComponent,
    BannerComponent,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    ProfilePicComponent,
    CalendarButtonComponent,
    MatCheckboxModule,
    PostFormComponent,
    BlogFormComponent,
    EventFormComponent,
    PollFormComponent,
    ListComponent,
    FormControlPipe,
  ],
  providers: [
    {
      useFactory: ngxEditorConfigFactory,
      provide: NGX_EDITOR_CONFIG_TOKEN,
      deps: [TranslateService, Translations],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: SharedModule,
      providers: [], // share state with providers (one instance)
    };
  }
}
