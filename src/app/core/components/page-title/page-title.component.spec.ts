import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { PageTitleComponent } from './page-title.component';
import { TranslateService } from '@ngx-translate/core';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;
  let translationService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTitleComponent ],
      providers: [ TranslateService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([TranslateService], (_translationService: TranslateService) => {
    translationService = _translationService;
  }));

  it('should inject the translation service', () => {
    expect(translationService).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
