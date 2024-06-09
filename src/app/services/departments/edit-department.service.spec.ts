import { TestBed } from '@angular/core/testing';

import { EditDepartmentService } from './edit-department.service';

describe('EditDepartmentService', () => {
  let service: EditDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
