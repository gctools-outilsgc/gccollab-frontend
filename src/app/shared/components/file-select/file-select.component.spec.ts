import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectComponent } from './file-select.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncateFileNamePipe } from '../../pipes/truncate-file-name/truncate-file-name.pipe';

describe('FileSelectComponent', () => {
  let component: FileSelectComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<FileSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileSelectComponent, TruncateFileNamePipe],
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
    fixture = TestBed.createComponent(FileSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(FileSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
