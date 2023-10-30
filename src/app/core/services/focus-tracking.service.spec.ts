import { TestBed } from '@angular/core/testing';

import { FocusTrackingService } from './focus-tracking.service';

describe('FocusTrackingService', () => {
  let service: FocusTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
