import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFormComponent } from './blog-form.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncateFileNamePipe } from '../../pipes/truncate-file-name.pipe';
describe('BlogFormComponent', () => {
  let component: BlogFormComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<BlogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogFormComponent, TruncateFileNamePipe],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
            deps: [ HttpClient ]
          }
        }),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ TranslateService, HttpClient ]
    });
    fixture = TestBed.createComponent(BlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(BlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
