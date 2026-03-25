import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DbDataService } from './db-data.service';

describe('DbDataService', () => {
  let service: DbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideNoopAnimations(), ],});
    service = TestBed.inject(DbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
