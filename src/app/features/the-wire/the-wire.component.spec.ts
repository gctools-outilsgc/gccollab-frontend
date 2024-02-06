import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheWireComponent } from './the-wire.component';

describe('TheWireComponent', () => {
  let component: TheWireComponent;
  let fixture: ComponentFixture<TheWireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheWireComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TheWireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
