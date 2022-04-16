import { TestBed } from '@angular/core/testing';

import { ChangeProfileNotificationService } from './change-profile-notification.service';

describe('ChangeProfileNotificationService', () => {
  let service: ChangeProfileNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeProfileNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
