import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarButtonComponent } from './calendar-button.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';

describe('CalendarButtonComponent', () => {
  let component: CalendarButtonComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<CalendarButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarButtonComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
      ],
      providers: [TranslateService, HttpClient],
    });
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(CalendarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
