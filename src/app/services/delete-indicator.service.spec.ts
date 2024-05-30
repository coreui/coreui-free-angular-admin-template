import { TestBed } from '@angular/core/testing';

import { DeleteIndicatorService } from './delete-indicator.service';

describe('DeleteIndicatorService', () => {
  let service: DeleteIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
