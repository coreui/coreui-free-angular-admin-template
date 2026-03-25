import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.currentUser();

  // Check if user is authenticated
  if (!isAuthenticated) {
    sessionStorage.setItem('returnUrl', state.url);
    return router.createUrlTree(['/login']);
  }

  // Check if user is admin
  if (!currentUser?.isAdmin) {
    // Redirect non-admin users to dashboard
    return router.createUrlTree(['/dashboard']);
  }

  // Allow access for admin users
  return true;
};
