import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollFormComponent } from './poll-form.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControlPipe } from '../../pipes/form-control/form-control.pipe';

describe('PollFormComponent', () => {
  let component: PollFormComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<PollFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollFormComponent, FormControlPipe],
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
    fixture = TestBed.createComponent(PollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(PollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
