import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayComponent } from './calendar-day.component';
import { DatePipe } from '@angular/common';

describe('CalendarDayComponent', () => {
  let component: CalendarDayComponent;
  let fixture: ComponentFixture<CalendarDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarDayComponent],
      imports: [DatePipe],
    });
    fixture = TestBed.createComponent(CalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
