import { TestBed } from '@angular/core/testing';

import { GuarantorService } from './guarantor.service';

describe('GuarantorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuarantorService = TestBed.get(GuarantorService);
    expect(service).toBeTruthy();
  });
});
