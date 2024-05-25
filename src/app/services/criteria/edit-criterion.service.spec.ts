import { TestBed } from '@angular/core/testing';

import { EditCriterionService } from './edit-criterion.service';

describe('EditCriterionService', () => {
  let service: EditCriterionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCriterionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
