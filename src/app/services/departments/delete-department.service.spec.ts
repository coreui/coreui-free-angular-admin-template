import { TestBed } from '@angular/core/testing';

import { DeleteDepartmentService } from './delete-department.service';

describe('DeleteDepartmentService', () => {
  let service: DeleteDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
