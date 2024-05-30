import { TestBed } from '@angular/core/testing';

import { EditIndicatorService } from './edit-indicator.service';

describe('EditIndicatorService', () => {
  let service: EditIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
