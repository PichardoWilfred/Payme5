import { TestBed } from '@angular/core/testing';

import { AuthHandlerService } from './auth-handler.service';

describe('AuthHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHandlerService = TestBed.get(AuthHandlerService);
    expect(service).toBeTruthy();
  });
});
