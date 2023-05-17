import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { TypescriptLoader } from 'src/app/core/helpers/typescript-loader';

describe('PageTitleComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let translateService: TranslateService;

  // TODO: Mock meaningful data
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
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
      providers: [ 
        TranslateService, 
        HttpClient, 
        {
          provide: ActivatedRoute, 
          useValue: fakeActivatedRoute
        } 
      ]
    })
    .compileComponents();

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
