import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
    
    // Clear all cookies before each test
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; max-age=0; path=/`;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a cookie', () => {
    service.setCookie('testCookie', 'testValue', { secure: false });
    expect(document.cookie).toContain('testCookie=testValue');
  });

  it('should get a cookie', () => {
    document.cookie = 'testCookie=testValue; path=/';
    const value = service.getCookie('testCookie');
    expect(value).toBe('testValue');
  });

  it('should return null for non-existent cookie', () => {
    const value = service.getCookie('nonExistent');
    expect(value).toBeNull();
  });

  it('should delete a cookie', () => {
    service.setCookie('testCookie', 'testValue', { secure: false });
    expect(service.hasCookie('testCookie')).toBe(true);
    
    service.deleteCookie('testCookie');
    expect(service.hasCookie('testCookie')).toBe(false);
  });

  it('should check if cookie exists', () => {
    expect(service.hasCookie('testCookie')).toBe(false);
    
    service.setCookie('testCookie', 'testValue', { secure: false });
    expect(service.hasCookie('testCookie')).toBe(true);
  });

  it('should set cookie with custom options', () => {
    service.setCookie('testCookie', 'testValue', {
      maxAge: 3600,
      path: '/',
      secure: false,
      sameSite: 'Lax'
    });
    
    expect(document.cookie).toContain('testCookie=testValue');
  });
});
