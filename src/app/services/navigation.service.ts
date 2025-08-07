import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INavData } from '@coreui/angular';
import { navItemsAdmin } from '../layout/default-layout/_nav-admin';
import { navItemsUser } from '../layout/default-layout/_nav-user';
import { ACLService } from './acl.service';
import { RESOURCES, ACTIONS } from '../config/acl.config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentNavItemsSubject = new BehaviorSubject<INavData[]>([]);
  public currentNavItems$ = this.currentNavItemsSubject.asObservable();

  constructor(private aclService: ACLService) {
    this.updateNavigation('User'); // Default to user navigation
  }

  updateNavigation(role: string): void {
    const navItems = this.getNavItemsForRole(role);
    this.currentNavItemsSubject.next(navItems);
  }

  isRouteAccessible(route: string, role: string): boolean {
    return this.aclService.canAccessRoute(route);
  }

  getNavItemsForRole(role: string): INavData[] {
    switch (role) {
      case 'Admin':
        return this.filterNavItemsByPermissions(navItemsAdmin);
      case 'User':
        return this.filterNavItemsByPermissions(navItemsUser);
      default:
        return this.generateNavItemsByACL();
    }
  }

  private filterNavItemsByPermissions(navItems: INavData[]): INavData[] {
    return navItems.filter(item => {
      // Check if user can access this route
      if (item.url && typeof item.url === 'string') {
        return this.aclService.canAccessRoute(item.url);
      }
      
      // If no specific permission check, allow access
      return true;
    }).map(item => {
      // Recursively filter children
      if (item.children) {
        item.children = this.filterNavItemsByPermissions(item.children);
      }
      return item;
    });
  }

  private generateNavItemsByACL(): INavData[] {
    const navItems: INavData[] = [];
    const currentRole = this.aclService.getCurrentRole();
    
    if (!currentRole) {
      return navItems;
    }

    // Dashboard - always accessible
    if (this.aclService.hasPermission(RESOURCES.DASHBOARD, ACTIONS.READ)) {
      navItems.push({
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'cil-speedometer'
      });
    }

    // Masters section
    const mastersItems: INavData[] = [];
    
    if (this.aclService.hasPermission(RESOURCES.COUNTRY_MASTER, ACTIONS.READ)) {
      mastersItems.push({
        name: 'Country Master',
        url: '/masters/countrymaster',
        icon: 'cil-flag-alt'
      });
    }
    
    if (this.aclService.hasPermission(RESOURCES.STATE_MASTER, ACTIONS.READ)) {
      mastersItems.push({
        name: 'State Master',
        url: '/masters/statemaster',
        icon: 'cil-map'
      });
    }
    
    if (this.aclService.hasPermission(RESOURCES.CITY_MASTER, ACTIONS.READ)) {
      mastersItems.push({
        name: 'City Master',
        url: '/masters/citymaster',
        icon: 'cil-location-pin'
      });
    }

    if (mastersItems.length > 0) {
      navItems.push({
        name: 'Masters',
        url: '/masters',
        icon: 'cil-list',
        children: mastersItems
      });
    }

    // System section
    const systemItems: INavData[] = [];
    
    if (this.aclService.hasPermission(RESOURCES.SYSTEM_SETTINGS, ACTIONS.READ)) {
      systemItems.push({
        name: 'System Settings',
        url: '/system/settings',
        icon: 'cil-gear'
      });
    }
    
    if (this.aclService.hasPermission(RESOURCES.USER_MANAGEMENT, ACTIONS.READ)) {
      systemItems.push({
        name: 'User Management',
        url: '/system/users',
        icon: 'cil-people'
      });
    }

    if (systemItems.length > 0) {
      navItems.push({
        name: 'System',
        url: '/system',
        icon: 'cil-settings',
        children: systemItems
      });
    }

    // Role Demo - for testing
    if (this.aclService.hasPermission(RESOURCES.ROLE_DEMO, ACTIONS.READ)) {
      navItems.push({
        name: 'Role Demo',
        url: '/role-demo',
        icon: 'cil-user-follow'
      });
    }

    return navItems;
  }

  private checkRouteInNavItems(route: string, navItems: INavData[]): boolean {
    for (const item of navItems) {
      if (item.url === route) {
        return true;
      }
      if (item.children) {
        if (this.checkRouteInNavItems(route, item.children)) {
          return true;
        }
      }
    }
    return false;
  }
} 