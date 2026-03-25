import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideNoopAnimations(), ],});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide API base URL', () => {
    expect(service.apiBaseUrl).toBeDefined();
    expect(typeof service.apiBaseUrl).toBe('string');
  });

  it('should provide production flag', () => {
    expect(typeof service.isProduction).toBe('boolean');
  });

  it('should provide token refresh configuration', () => {
    expect(typeof service.tokenRefreshTimeBeforeExpiry).toBe('number');
    expect(service.tokenRefreshTimeBeforeExpiry).toBeGreaterThan(0);
  });
});
