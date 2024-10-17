import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guestGuard } from './guest.guard';

describe('guestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
