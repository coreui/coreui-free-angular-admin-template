import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.currentUser();

  if (!isAuthenticated) {
    sessionStorage.setItem('returnUrl', state.url);

    if (state.url === '/fanta') {
      return router.createUrlTree(['/fanta-dashboard']);
    } else if (state.url === '/admin') {
      return router.createUrlTree(['/dashboard']);
    }

    return router.createUrlTree(['/login']); // default fallback
  } else if (state.url === '/admin') {
    if (currentUser?.isAdmin) {
      return true; // allow access
    } else {
      return router.createUrlTree(['/dashboard']); // redirect if not admin
    }
  }

  return true;
};


