import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarButtonComponent } from './calendar-button.component';

describe('CalendarButtonComponent', () => {
  let component: CalendarButtonComponent;
  let fixture: ComponentFixture<CalendarButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarButtonComponent]
    });
    fixture = TestBed.createComponent(CalendarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
