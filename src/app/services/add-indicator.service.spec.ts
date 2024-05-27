import { TestBed } from '@angular/core/testing';

import { AddIndicatorService } from './add-indicator.service';

describe('AddIndicatorService', () => {
  let service: AddIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
