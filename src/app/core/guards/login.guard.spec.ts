import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AuthConfigModule } from '../auth/auth.module';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthConfigModule],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
