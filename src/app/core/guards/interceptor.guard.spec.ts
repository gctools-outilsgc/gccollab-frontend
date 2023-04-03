import { TestBed } from '@angular/core/testing';

import { InterceptorGuard } from './interceptor.guard';

describe('InterceptorGuard', () => {
  let guard: InterceptorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InterceptorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
