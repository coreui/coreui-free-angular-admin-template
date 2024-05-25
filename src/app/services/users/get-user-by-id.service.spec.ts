import { TestBed } from '@angular/core/testing';

import { GetUserByIdService } from './get-user-by-id.service';

describe('GetUserByIdService', () => {
  let service: GetUserByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
