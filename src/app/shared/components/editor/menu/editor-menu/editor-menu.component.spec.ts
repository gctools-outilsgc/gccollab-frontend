import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMenuComponent } from './editor-menu.component';

describe('EditorMenuComponent', () => {
  let component: EditorMenuComponent;
  let fixture: ComponentFixture<EditorMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorMenuComponent]
    });
    fixture = TestBed.createComponent(EditorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
