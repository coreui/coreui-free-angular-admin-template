import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get token from auth service
  const token = authService.getToken();
  
  // Clone the request and add the authorization header if token exists
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized errors
      if (error.status === 401) {
        // Skip token refresh for logout API calls to avoid infinite loops
        const isLogoutRequest = request.url.includes('/logout');
        
        if (isLogoutRequest) {
          authService.clearLocalStorage();
          router.navigate(['/login']);
          return throwError(() => error);
        }
        
        // Check if we have a valid refresh token
        if (authService.isRefreshTokenValid()) {
          // Attempt to refresh the token
          return authService.refreshAccessToken().pipe(
            switchMap(refreshResponse => {
              // Get the new token
              const newToken = authService.getToken();
              
              // Clone the original request with the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              
              // Retry the original request with the new token
              return next(newRequest);
            }),
            catchError(refreshError => {
              // If refresh fails, logout the user
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => refreshError);
            })
          );
        } else {
          // No valid refresh token, logout user
          authService.logout();
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
} 