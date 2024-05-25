import { TestBed } from '@angular/core/testing';

import { GetCriterionByIdService } from './get-criterion-by-id.service';

describe('GetCriterionByIdService', () => {
  let service: GetCriterionByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCriterionByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
