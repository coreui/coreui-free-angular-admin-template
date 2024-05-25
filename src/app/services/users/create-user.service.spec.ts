import { TestBed } from '@angular/core/testing';

import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
