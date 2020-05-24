import { TestBed, async, inject } from '@angular/core/testing';

import { AuthLoggedGuard } from './auth-logged.guard';

describe('AuthLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoggedGuard]
    });
  });

  it('should ...', inject([AuthLoggedGuard], (guard: AuthLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
