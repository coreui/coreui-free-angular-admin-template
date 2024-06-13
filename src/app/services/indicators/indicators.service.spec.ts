import { TestBed } from '@angular/core/testing';

import { IndicatorsService } from './indicators.service';

describe('IndicatorsService', () => {
  let service: IndicatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
