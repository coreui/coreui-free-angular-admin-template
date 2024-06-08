import { TestBed } from '@angular/core/testing';

import { GetDepartmentByIdService } from './get-department-by-id.service';

describe('GetDepartmentByIdService', () => {
  let service: GetDepartmentByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDepartmentByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
