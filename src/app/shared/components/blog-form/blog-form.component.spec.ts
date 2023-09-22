import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFormComponent } from './blog-form.component';

describe('BlogFormComponent', () => {
  let component: BlogFormComponent;
  let fixture: ComponentFixture<BlogFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogFormComponent]
    });
    fixture = TestBed.createComponent(BlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
