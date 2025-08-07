import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ACLService } from '../services/acl.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private aclService: ACLService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Get current user
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    // Get selected role from localStorage or use first role
    const selectedRole = localStorage.getItem('selectedRole') || currentUser.roles?.[0];
    if (!selectedRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Check if the route is accessible using ACL
    const isAccessible = this.aclService.canAccessRoute(state.url);
    
    if (!isAccessible) {
      this.router.navigate(['/dashboard'], { 
        queryParams: { 
          error: 'access-denied',
          requestedUrl: state.url 
        } 
      });
      return false;
    }

    return true;
  }
} 