import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  // Define public routes that don't require authentication
  private publicRoutes = ['/login', '/register', '/404', '/500'];
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the current route is public
    const isPublicRoute = this.publicRoutes.some(publicRoute => 
      state.url.startsWith(publicRoute)
    );
    
    if (isPublicRoute) {
      return true;
    }
    
    // For protected routes, check authentication
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      return true;
    } else {
      // Force navigation to login page and prevent back navigation
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }
} 