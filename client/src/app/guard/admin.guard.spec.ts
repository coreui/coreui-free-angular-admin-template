import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CanActivateFn } from '@angular/router';

import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideNoopAnimations(), ],});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
