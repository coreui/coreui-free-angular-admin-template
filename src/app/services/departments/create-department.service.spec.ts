import { TestBed } from '@angular/core/testing';

import { CreateDepartmentService } from './create-department.service';

describe('CreateDepartmentService', () => {
  let service: CreateDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
