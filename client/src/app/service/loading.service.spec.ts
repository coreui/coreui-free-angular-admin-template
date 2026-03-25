import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loading on first show() call', () => {
    expect(service.loading()).toBeFalse();
    service.show();
    expect(service.loading()).toBeTrue();
  });

  it('should hide loading after matching hide() calls', () => {
    service.show();
    service.show();
    expect(service.loading()).toBeTrue();
    service.hide();
    expect(service.loading()).toBeTrue();
    service.hide();
    expect(service.loading()).toBeFalse();
  });

  it('should not affect loading state when hide() is called without show()', () => {
    expect(service.loading()).toBeFalse();
    service.hide();
    expect(service.loading()).toBeFalse();
  });
});