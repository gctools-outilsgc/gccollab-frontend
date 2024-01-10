import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControlPipe } from 'src/app/shared/pipes/form-control/form-control.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsComponent, FormControlPipe],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TypescriptLoader (http, 'translations'),
            deps: [ HttpClient ]
          }
        }),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ TranslateService, HttpClient ]
    });
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
