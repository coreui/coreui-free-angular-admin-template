import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ACL_CONFIG, ACLRole, ACLPermission, RESOURCES, ACTIONS, ROUTE_PERMISSIONS, FEATURE_PERMISSIONS } from '../config/acl.config';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ACLService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentRoleSubject = new BehaviorSubject<string | null>(null);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public currentRole$ = this.currentRoleSubject.asObservable();

  constructor(private authService: AuthService) {
    // Subscribe to auth service to get current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUserSubject.next(user);
      this.updateCurrentRole();
    });
  }

  /**
   * Update current role based on user's selected role
   */
  private updateCurrentRole(): void {
    const selectedRole = localStorage.getItem('selectedRole');
    this.currentRoleSubject.next(selectedRole);
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get current role
   */
  getCurrentRole(): string | null {
    return this.currentRoleSubject.value;
  }

  /**
   * Check if user has permission for a specific resource and action
   */
  hasPermission(resource: string, action: string): boolean {
    const currentRole = this.getCurrentRole();
    if (!currentRole) {
      return false;
    }

    const role = ACL_CONFIG.roles[currentRole];
    if (!role) {
      return false;
    }

    // Check if role has permission for the resource and action
    const permission = role.permissions.find(p => p.resource === resource);
    if (!permission) {
      return false;
    }

    return permission.actions.includes(action);
  }

  /**
   * Check if user can access a specific route
   */
  canAccessRoute(route: string): boolean {
    const routePermission = ROUTE_PERMISSIONS[route];
    if (!routePermission) {
      return true; // If no permission defined, allow access
    }

    return this.hasPermission(routePermission.resource, routePermission.action);
  }

  /**
   * Check if user can use a specific feature
   */
  canUseFeature(feature: string): boolean {
    const featurePermission = FEATURE_PERMISSIONS[feature];
    if (!featurePermission) {
      return true; // If no permission defined, allow access
    }

    return this.hasPermission(featurePermission.resource, featurePermission.action);
  }

  /**
   * Get all permissions for current role
   */
  getCurrentRolePermissions(): ACLPermission[] {
    const currentRole = this.getCurrentRole();
    if (!currentRole) {
      return [];
    }

    const role = ACL_CONFIG.roles[currentRole];
    return role ? role.permissions : [];
  }

  /**
   * Get all accessible routes for current role
   */
  getAccessibleRoutes(): string[] {
    const accessibleRoutes: string[] = [];
    
    Object.keys(ROUTE_PERMISSIONS).forEach(route => {
      if (this.canAccessRoute(route)) {
        accessibleRoutes.push(route);
      }
    });

    return accessibleRoutes;
  }

  /**
   * Get all accessible features for current role
   */
  getAccessibleFeatures(): string[] {
    const accessibleFeatures: string[] = [];
    
    Object.keys(FEATURE_PERMISSIONS).forEach(feature => {
      if (this.canUseFeature(feature)) {
        accessibleFeatures.push(feature);
      }
    });

    return accessibleFeatures;
  }

  /**
   * Check if user has any of the specified permissions
   */
  hasAnyPermission(permissions: Array<{ resource: string; action: string }>): boolean {
    return permissions.some(permission => 
      this.hasPermission(permission.resource, permission.action)
    );
  }

  /**
   * Check if user has all of the specified permissions
   */
  hasAllPermissions(permissions: Array<{ resource: string; action: string }>): boolean {
    return permissions.every(permission => 
      this.hasPermission(permission.resource, permission.action)
    );
  }

  /**
   * Get available roles
   */
  getAvailableRoles(): string[] {
    return Object.keys(ACL_CONFIG.roles);
  }

  /**
   * Get role permissions
   */
  getRolePermissions(roleName: string): ACLPermission[] {
    const role = ACL_CONFIG.roles[roleName];
    return role ? role.permissions : [];
  }

  /**
   * Check if current user is admin
   */
  isAdmin(): boolean {
    const currentRole = this.getCurrentRole();
    return currentRole === 'Admin';
  }

  /**
   * Check if current user is manager or higher
   */
  isManagerOrHigher(): boolean {
    const currentRole = this.getCurrentRole();
    return currentRole === 'Admin' || currentRole === 'Manager';
  }

  /**
   * Check if current user can manage data (create, update, delete)
   */
  canManageData(): boolean {
    return this.hasAnyPermission([
      { resource: RESOURCES.CREATE_COUNTRY, action: ACTIONS.CREATE },
      { resource: RESOURCES.UPDATE_COUNTRY, action: ACTIONS.UPDATE },
      { resource: RESOURCES.DELETE_COUNTRY, action: ACTIONS.DELETE },
      { resource: RESOURCES.CREATE_STATE, action: ACTIONS.CREATE },
      { resource: RESOURCES.UPDATE_STATE, action: ACTIONS.UPDATE },
      { resource: RESOURCES.DELETE_STATE, action: ACTIONS.DELETE },
      { resource: RESOURCES.CREATE_CITY, action: ACTIONS.CREATE },
      { resource: RESOURCES.UPDATE_CITY, action: ACTIONS.UPDATE },
      { resource: RESOURCES.DELETE_CITY, action: ACTIONS.DELETE }
    ]);
  }

  /**
   * Check if current user can export data
   */
  canExportData(): boolean {
    return this.hasPermission(RESOURCES.EXPORT_DATA, ACTIONS.EXPORT);
  }

  /**
   * Check if current user can print data
   */
  canPrintData(): boolean {
    return this.hasPermission(RESOURCES.PRINT_DATA, ACTIONS.PRINT);
  }

  /**
   * Check if current user can search data
   */
  canSearchData(): boolean {
    return this.hasPermission(RESOURCES.SEARCH_DATA, ACTIONS.SEARCH);
  }

  /**
   * Check if current user can filter data
   */
  canFilterData(): boolean {
    return this.hasPermission(RESOURCES.FILTER_DATA, ACTIONS.FILTER);
  }

  /**
   * Check if current user can manage users
   */
  canManageUsers(): boolean {
    return this.hasPermission(RESOURCES.MANAGE_USERS, ACTIONS.MANAGE);
  }

  /**
   * Check if current user can manage roles
   */
  canManageRoles(): boolean {
    return this.hasPermission(RESOURCES.MANAGE_ROLES, ACTIONS.MANAGE);
  }

  /**
   * Check if current user can view logs
   */
  canViewLogs(): boolean {
    return this.hasPermission(RESOURCES.VIEW_LOGS, ACTIONS.VIEW);
  }

  /**
   * Check if current user can configure system
   */
  canConfigureSystem(): boolean {
    return this.hasPermission(RESOURCES.SYSTEM_CONFIG, ACTIONS.MANAGE);
  }

  /**
   * Get user's role display name
   */
  getRoleDisplayName(roleName: string): string {
    const role = ACL_CONFIG.roles[roleName];
    return role ? role.name : roleName;
  }

  /**
   * Get current role display name
   */
  getCurrentRoleDisplayName(): string {
    const currentRole = this.getCurrentRole();
    return currentRole ? this.getRoleDisplayName(currentRole) : 'No Role';
  }
}
