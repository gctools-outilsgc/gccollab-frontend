import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormComponent } from './location-form.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncateFileNamePipe } from '../../pipes/truncate-file-name/truncate-file-name.pipe';
import { FormControlPipe } from '../../pipes/form-control/form-control.pipe';
describe('LocationFormComponent', () => {
  let component: LocationFormComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<LocationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationFormComponent, TruncateFileNamePipe, FormControlPipe],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [TranslateService, HttpClient],
    });
    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
