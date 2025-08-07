import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ACLService } from '../services/acl.service';
import { AuthService } from '../services/auth.service';
import { ROUTE_PERMISSIONS } from '../config/acl.config';

@Injectable({
  providedIn: 'root'
})
export class ACLGuard implements CanActivate {
  constructor(
    private aclService: ACLService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // First check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const url = state.url;
    
    // Check if route requires permission
    const routePermission = ROUTE_PERMISSIONS[url];
    if (!routePermission) {
      // If no permission defined for this route, allow access
      return true;
    }

    // Check if user has permission for this route
    const hasPermission = this.aclService.hasPermission(
      routePermission.resource,
      routePermission.action
    );

    if (!hasPermission) {
      // Redirect to unauthorized page or dashboard
      this.router.navigate(['/dashboard'], { 
        queryParams: { 
          error: 'access-denied',
          requestedUrl: url 
        } 
      });
      return false;
    }

    return true;
  }
}
