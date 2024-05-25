import { TestBed } from '@angular/core/testing';

import { DeleteCriterionService } from './delete-criterion.service';

describe('DeleteCriterionService', () => {
  let service: DeleteCriterionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCriterionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
