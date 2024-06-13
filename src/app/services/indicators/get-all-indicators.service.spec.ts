import { TestBed } from '@angular/core/testing';

import { GetAllIndicatorsService } from './get-all-indicators.service';

describe('GetAllIndicatorsService', () => {
  let service: GetAllIndicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllIndicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
