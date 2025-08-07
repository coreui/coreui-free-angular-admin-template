import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Redirect to dashboard if already authenticated
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      // Allow access to login page if not authenticated
      return true;
    }
  }
} 