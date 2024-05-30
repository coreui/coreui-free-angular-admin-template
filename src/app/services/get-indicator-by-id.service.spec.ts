import { TestBed } from '@angular/core/testing';

import { GetIndicatorByIdService } from './get-indicator-by-id.service';

describe('GetIndicatorByIdService', () => {
  let service: GetIndicatorByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetIndicatorByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
