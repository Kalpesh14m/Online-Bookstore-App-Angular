import { TestBed } from '@angular/core/testing';

import { EncrDecrService } from 'src/services/encr-decr-service.service';

describe('EncrDecrServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncrDecrService = TestBed.get(EncrDecrService);
    expect(service).toBeTruthy();
  });
});
