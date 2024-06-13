import { TestBed } from '@angular/core/testing';

import { CreateCriterionService } from './create-criterion.service';

describe('CreateCriterionService', () => {
  let service: CreateCriterionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCriterionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
