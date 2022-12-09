import { TestBed } from '@angular/core/testing';

import { LanguageStorageService } from './language-storage.service';

describe('LanguageStorageService', () => {
  let service: LanguageStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
