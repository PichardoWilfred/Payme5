import { TestBed, async, inject } from '@angular/core/testing';

import { VerifyEmailGuard } from './verify-email.guard';

describe('VerifyEmailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyEmailGuard]
    });
  });

  it('should ...', inject([VerifyEmailGuard], (guard: VerifyEmailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
