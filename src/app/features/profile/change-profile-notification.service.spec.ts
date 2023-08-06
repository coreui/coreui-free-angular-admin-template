import { TestBed } from '@angular/core/testing';

import { UserActionNotificationService } from '@core/services/user-action-notification.service';

describe('ChangeProfileNotificationService', () => {
  let service: UserActionNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserActionNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
