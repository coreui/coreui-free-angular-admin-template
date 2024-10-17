import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {

  if (inject(AuthService).isLoggedIn()) {
    const router = inject(Router);
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
