import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

import { LoginComponent } from './login.component';
import { TranslateService } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [ HttpClient ]
          }
        }),
        HttpClientModule
      ],
      providers: [ TranslateService, HttpClient ]
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
