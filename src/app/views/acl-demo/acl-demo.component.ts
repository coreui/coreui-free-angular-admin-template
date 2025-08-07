import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { ACLService } from '../../services/acl.service';
import { ACLDirective } from '../../directives/acl.directive';
import { RESOURCES, ACTIONS } from '../../config/acl.config';

@Component({
  selector: 'app-acl-demo',
  templateUrl: './acl-demo.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ACLDirective
  ]
})
export class ACLDemoComponent implements OnInit {
  currentUser: any = null;
  currentRole: string | null = null;
  accessibleRoutes: string[] = [];
  accessibleFeatures: string[] = [];
  rolePermissions: any[] = [];
  availableRoles: string[] = [];

  constructor(private aclService: ACLService) {}

  ngOnInit(): void {
    this.loadACLData();
  }

  private loadACLData(): void {
    this.currentUser = this.aclService.getCurrentUser();
    this.currentRole = this.aclService.getCurrentRole();
    this.accessibleRoutes = this.aclService.getAccessibleRoutes();
    this.accessibleFeatures = this.aclService.getAccessibleFeatures();
    this.rolePermissions = this.aclService.getCurrentRolePermissions();
    this.availableRoles = this.aclService.getAvailableRoles();
  }

  // Permission check methods
  canManageData(): boolean {
    return this.aclService.canManageData();
  }

  canExportData(): boolean {
    return this.aclService.canExportData();
  }

  canPrintData(): boolean {
    return this.aclService.canPrintData();
  }

  canSearchData(): boolean {
    return this.aclService.canSearchData();
  }

  canFilterData(): boolean {
    return this.aclService.canFilterData();
  }

  canManageUsers(): boolean {
    return this.aclService.canManageUsers();
  }

  canManageRoles(): boolean {
    return this.aclService.canManageRoles();
  }

  canViewLogs(): boolean {
    return this.aclService.canViewLogs();
  }

  canConfigureSystem(): boolean {
    return this.aclService.canConfigureSystem();
  }

  // Specific resource permission checks
  canReadCountryMaster(): boolean {
    return this.aclService.hasPermission(RESOURCES.COUNTRY_MASTER, ACTIONS.READ);
  }

  canCreateCountry(): boolean {
    return this.aclService.hasPermission(RESOURCES.CREATE_COUNTRY, ACTIONS.CREATE);
  }

  canUpdateCountry(): boolean {
    return this.aclService.hasPermission(RESOURCES.UPDATE_COUNTRY, ACTIONS.UPDATE);
  }

  canDeleteCountry(): boolean {
    return this.aclService.hasPermission(RESOURCES.DELETE_COUNTRY, ACTIONS.DELETE);
  }

  canReadStateMaster(): boolean {
    return this.aclService.hasPermission(RESOURCES.STATE_MASTER, ACTIONS.READ);
  }

  canCreateState(): boolean {
    return this.aclService.hasPermission(RESOURCES.CREATE_STATE, ACTIONS.CREATE);
  }

  canUpdateState(): boolean {
    return this.aclService.hasPermission(RESOURCES.UPDATE_STATE, ACTIONS.UPDATE);
  }

  canDeleteState(): boolean {
    return this.aclService.hasPermission(RESOURCES.DELETE_STATE, ACTIONS.DELETE);
  }

  canReadCityMaster(): boolean {
    return this.aclService.hasPermission(RESOURCES.CITY_MASTER, ACTIONS.READ);
  }

  canCreateCity(): boolean {
    return this.aclService.hasPermission(RESOURCES.CREATE_CITY, ACTIONS.CREATE);
  }

  canUpdateCity(): boolean {
    return this.aclService.hasPermission(RESOURCES.UPDATE_CITY, ACTIONS.UPDATE);
  }

  canDeleteCity(): boolean {
    return this.aclService.hasPermission(RESOURCES.DELETE_CITY, ACTIONS.DELETE);
  }

  // Role check methods
  isAdmin(): boolean {
    return this.aclService.isAdmin();
  }

  isManagerOrHigher(): boolean {
    return this.aclService.isManagerOrHigher();
  }

  getCurrentRoleDisplayName(): string {
    return this.aclService.getCurrentRoleDisplayName();
  }
}
