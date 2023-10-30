import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormComponent } from './event-form.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventFormComponent],
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
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
