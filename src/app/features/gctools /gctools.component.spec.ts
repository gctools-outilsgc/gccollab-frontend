import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCtoolsComponent } from './gctools.component';

describe('BookmarksComponent', () => {
  let component: GCtoolsComponent;
  let fixture: ComponentFixture<GCtoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCtoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GCtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
