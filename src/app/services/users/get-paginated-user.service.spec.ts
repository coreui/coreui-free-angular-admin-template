import { TestBed } from '@angular/core/testing';

import { GetPaginatedUserService } from './get-paginated-user.service';

describe('GetPaginatedUserService', () => {
  let service: GetPaginatedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPaginatedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
