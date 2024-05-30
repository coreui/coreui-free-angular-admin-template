import { TestBed } from '@angular/core/testing';

import { GetPaginatedIndicatorService } from './get-paginated-indicator.service';

describe('GetPaginatedIndicatorService', () => {
  let service: GetPaginatedIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPaginatedIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
