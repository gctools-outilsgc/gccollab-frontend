import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicComponent } from './profile-pic.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';

describe('ProfilePicComponent', () => {
  let component: ProfilePicComponent;
  let translateService: TranslateService;
  let fixture: ComponentFixture<ProfilePicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePicComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TypescriptLoader(http, 'translations'),
            deps: [ HttpClient ]
          }
        }),
        HttpClientModule
      ],
      providers: [ TranslateService, HttpClient ]
    });
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(ProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
