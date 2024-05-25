import { TestBed } from '@angular/core/testing';

import { GetPaginatedCriteriaService } from './get-paginated-criteria.service';

describe('GetPaginatedCriteriaService', () => {
  let service: GetPaginatedCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPaginatedCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
