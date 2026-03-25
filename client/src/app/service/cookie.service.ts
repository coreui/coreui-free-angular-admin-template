import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  setCookie(name: string, value: string, options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}): void {
    const {
      maxAge,
      path = '/',
      secure = true,
      sameSite = 'Strict'
    } = options;

    let cookieString = `${name}=${value}; path=${path}`;

    if (maxAge !== undefined) {
      cookieString += `; max-age=${maxAge}`;
    }

    if (secure) {
      cookieString += '; Secure';
    }

    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`;
    }

    document.cookie = cookieString;
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^|;) ?${name}=([^;]*)(;|$)`));
    return match ? match[2] : null;
  }

  deleteCookie(name: string, path = '/'): void {
    document.cookie = `${name}=; path=${path}; max-age=0`;
  }

  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }
}
