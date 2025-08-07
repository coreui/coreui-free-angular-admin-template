export interface ACLPermission {
  resource: string;
  actions: string[];
  conditions?: {
    [key: string]: any;
  };
}

export interface ACLRole {
  name: string;
  permissions: ACLPermission[];
  inherits?: string[];
}

export interface ACLConfig {
  roles: { [roleName: string]: ACLRole };
  resources: { [resourceName: string]: string };
  actions: { [actionName: string]: string };
}

// Define available resources
export const RESOURCES = {
  // Pages
  DASHBOARD: 'dashboard',
  COUNTRY_MASTER: 'country-master',
  STATE_MASTER: 'state-master',
  CITY_MASTER: 'city-master',
  SYSTEM_SETTINGS: 'system-settings',
  USER_MANAGEMENT: 'user-management',
  ROLE_DEMO: 'role-demo',
  
  // Functionality
  VIEW_DATA: 'view-data',
  EXPORT_DATA: 'export-data',
  PRINT_DATA: 'print-data',
  SEARCH_DATA: 'search-data',
  FILTER_DATA: 'filter-data',
  
  // Master Data Operations
  CREATE_COUNTRY: 'create-country',
  UPDATE_COUNTRY: 'update-country',
  DELETE_COUNTRY: 'delete-country',
  CREATE_STATE: 'create-state',
  UPDATE_STATE: 'update-state',
  DELETE_STATE: 'delete-state',
  CREATE_CITY: 'create-city',
  UPDATE_CITY: 'update-city',
  DELETE_CITY: 'delete-city',
  
  // System Operations
  MANAGE_USERS: 'manage-users',
  MANAGE_ROLES: 'manage-roles',
  VIEW_LOGS: 'view-logs',
  SYSTEM_CONFIG: 'system-config',
  
  // Profile Operations
  VIEW_PROFILE: 'view-profile',
  UPDATE_PROFILE: 'update-profile',
  CHANGE_PASSWORD: 'change-password'
};

// Define available actions
export const ACTIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  CREATE: 'create',
  UPDATE: 'update',
  EXPORT: 'export',
  PRINT: 'print',
  SEARCH: 'search',
  FILTER: 'filter',
  MANAGE: 'manage',
  VIEW: 'view'
};

// ACL Configuration
export const ACL_CONFIG: ACLConfig = {
  resources: RESOURCES,
  actions: ACTIONS,
  roles: {
    'Admin': {
      name: 'Admin',
      permissions: [
        // Full access to all pages
        { resource: RESOURCES.DASHBOARD, actions: [ACTIONS.READ, ACTIONS.WRITE] },
        { resource: RESOURCES.COUNTRY_MASTER, actions: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.EXPORT, ACTIONS.PRINT, ACTIONS.SEARCH, ACTIONS.FILTER] },
        { resource: RESOURCES.STATE_MASTER, actions: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.EXPORT, ACTIONS.PRINT, ACTIONS.SEARCH, ACTIONS.FILTER] },
        { resource: RESOURCES.CITY_MASTER, actions: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.EXPORT, ACTIONS.PRINT, ACTIONS.SEARCH, ACTIONS.FILTER] },
        { resource: RESOURCES.SYSTEM_SETTINGS, actions: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.MANAGE] },
        { resource: RESOURCES.USER_MANAGEMENT, actions: [ACTIONS.READ, ACTIONS.WRITE, ACTIONS.CREATE, ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.MANAGE] },
        { resource: RESOURCES.ROLE_DEMO, actions: [ACTIONS.READ, ACTIONS.WRITE] },
        
        // Full access to all functionality
        { resource: RESOURCES.VIEW_DATA, actions: [ACTIONS.READ] },
        { resource: RESOURCES.EXPORT_DATA, actions: [ACTIONS.EXPORT] },
        { resource: RESOURCES.PRINT_DATA, actions: [ACTIONS.PRINT] },
        { resource: RESOURCES.SEARCH_DATA, actions: [ACTIONS.SEARCH] },
        { resource: RESOURCES.FILTER_DATA, actions: [ACTIONS.FILTER] },
        
        // Master data operations
        { resource: RESOURCES.CREATE_COUNTRY, actions: [ACTIONS.CREATE] },
        { resource: RESOURCES.UPDATE_COUNTRY, actions: [ACTIONS.UPDATE] },
        { resource: RESOURCES.DELETE_COUNTRY, actions: [ACTIONS.DELETE] },
        { resource: RESOURCES.CREATE_STATE, actions: [ACTIONS.CREATE] },
        { resource: RESOURCES.UPDATE_STATE, actions: [ACTIONS.UPDATE] },
        { resource: RESOURCES.DELETE_STATE, actions: [ACTIONS.DELETE] },
        { resource: RESOURCES.CREATE_CITY, actions: [ACTIONS.CREATE] },
        { resource: RESOURCES.UPDATE_CITY, actions: [ACTIONS.UPDATE] },
        { resource: RESOURCES.DELETE_CITY, actions: [ACTIONS.DELETE] },
        
        // System operations
        { resource: RESOURCES.MANAGE_USERS, actions: [ACTIONS.MANAGE] },
        { resource: RESOURCES.MANAGE_ROLES, actions: [ACTIONS.MANAGE] },
        { resource: RESOURCES.VIEW_LOGS, actions: [ACTIONS.VIEW] },
        { resource: RESOURCES.SYSTEM_CONFIG, actions: [ACTIONS.MANAGE] },
        
        // Profile operations
        { resource: RESOURCES.VIEW_PROFILE, actions: [ACTIONS.VIEW] },
        { resource: RESOURCES.UPDATE_PROFILE, actions: [ACTIONS.UPDATE] },
        { resource: RESOURCES.CHANGE_PASSWORD, actions: [ACTIONS.UPDATE] }
      ]
    },
    
    'Manager': {
      name: 'Manager',
      permissions: [
        // Limited access to pages
        { resource: RESOURCES.DASHBOARD, actions: [ACTIONS.READ] },
        { resource: RESOURCES.COUNTRY_MASTER, actions: [ACTIONS.READ, ACTIONS.SEARCH, ACTIONS.FILTER, ACTIONS.EXPORT, ACTIONS.PRINT] },
        { resource: RESOURCES.STATE_MASTER, actions: [ACTIONS.READ, ACTIONS.SEARCH, ACTIONS.FILTER, ACTIONS.EXPORT, ACTIONS.PRINT] },
        { resource: RESOURCES.CITY_MASTER, actions: [ACTIONS.READ, ACTIONS.SEARCH, ACTIONS.FILTER, ACTIONS.EXPORT, ACTIONS.PRINT] },
        { resource: RESOURCES.ROLE_DEMO, actions: [ACTIONS.READ] },
        
        // Limited functionality
        { resource: RESOURCES.VIEW_DATA, actions: [ACTIONS.READ] },
        { resource: RESOURCES.EXPORT_DATA, actions: [ACTIONS.EXPORT] },
        { resource: RESOURCES.PRINT_DATA, actions: [ACTIONS.PRINT] },
        { resource: RESOURCES.SEARCH_DATA, actions: [ACTIONS.SEARCH] },
        { resource: RESOURCES.FILTER_DATA, actions: [ACTIONS.FILTER] },
        
        // Profile operations
        { resource: RESOURCES.VIEW_PROFILE, actions: [ACTIONS.VIEW] },
        { resource: RESOURCES.UPDATE_PROFILE, actions: [ACTIONS.UPDATE] },
        { resource: RESOURCES.CHANGE_PASSWORD, actions: [ACTIONS.UPDATE] }
      ]
    },
    
    'User': {
      name: 'User',
      permissions: [
        // Very limited access
        { resource: RESOURCES.DASHBOARD, actions: [ACTIONS.READ] },
        { resource: RESOURCES.COUNTRY_MASTER, actions: [ACTIONS.READ, ACTIONS.SEARCH, ACTIONS.FILTER] },
        { resource: RESOURCES.STATE_MASTER, actions: [ACTIONS.READ, ACTIONS.SEARCH, ACTIONS.FILTER] },
        { resource: RESOURCES.CITY_MASTER, actions: [ACTIONS.READ, ACTIONS.SEARCH, ACTIONS.FILTER] },
        { resource: RESOURCES.ROLE_DEMO, actions: [ACTIONS.READ] },
        
        // Basic functionality
        { resource: RESOURCES.VIEW_DATA, actions: [ACTIONS.READ] },
        { resource: RESOURCES.SEARCH_DATA, actions: [ACTIONS.SEARCH] },
        { resource: RESOURCES.FILTER_DATA, actions: [ACTIONS.FILTER] },
        
        // Profile operations
        { resource: RESOURCES.VIEW_PROFILE, actions: [ACTIONS.VIEW] },
        { resource: RESOURCES.UPDATE_PROFILE, actions: [ACTIONS.UPDATE] },
        { resource: RESOURCES.CHANGE_PASSWORD, actions: [ACTIONS.UPDATE] }
      ]
    },
    
    'Guest': {
      name: 'Guest',
      permissions: [
        // Minimal access
        { resource: RESOURCES.DASHBOARD, actions: [ACTIONS.READ] },
        { resource: RESOURCES.COUNTRY_MASTER, actions: [ACTIONS.READ] },
        { resource: RESOURCES.STATE_MASTER, actions: [ACTIONS.READ] },
        { resource: RESOURCES.CITY_MASTER, actions: [ACTIONS.READ] },
        { resource: RESOURCES.ROLE_DEMO, actions: [ACTIONS.READ] },
        
        // Basic functionality
        { resource: RESOURCES.VIEW_DATA, actions: [ACTIONS.READ] },
        
        // Profile operations
        { resource: RESOURCES.VIEW_PROFILE, actions: [ACTIONS.VIEW] }
      ]
    }
  }
};

// Route-based permissions mapping
export const ROUTE_PERMISSIONS: { [key: string]: { resource: string; action: string } } = {
  '/dashboard': { resource: RESOURCES.DASHBOARD, action: ACTIONS.READ },
  '/masters/countrymaster': { resource: RESOURCES.COUNTRY_MASTER, action: ACTIONS.READ },
  '/masters/statemaster': { resource: RESOURCES.STATE_MASTER, action: ACTIONS.READ },
  '/masters/citymaster': { resource: RESOURCES.CITY_MASTER, action: ACTIONS.READ },
  '/system/settings': { resource: RESOURCES.SYSTEM_SETTINGS, action: ACTIONS.READ },
  '/system/users': { resource: RESOURCES.USER_MANAGEMENT, action: ACTIONS.READ },
  '/role-demo': { resource: RESOURCES.ROLE_DEMO, action: ACTIONS.READ }
};

// Feature-based permissions mapping
export const FEATURE_PERMISSIONS: { [key: string]: { resource: string; action: string } } = {
  'export-data': { resource: RESOURCES.EXPORT_DATA, action: ACTIONS.EXPORT },
  'print-data': { resource: RESOURCES.PRINT_DATA, action: ACTIONS.PRINT },
  'search-data': { resource: RESOURCES.SEARCH_DATA, action: ACTIONS.SEARCH },
  'filter-data': { resource: RESOURCES.FILTER_DATA, action: ACTIONS.FILTER },
  'create-country': { resource: RESOURCES.CREATE_COUNTRY, action: ACTIONS.CREATE },
  'update-country': { resource: RESOURCES.UPDATE_COUNTRY, action: ACTIONS.UPDATE },
  'delete-country': { resource: RESOURCES.DELETE_COUNTRY, action: ACTIONS.DELETE },
  'create-state': { resource: RESOURCES.CREATE_STATE, action: ACTIONS.CREATE },
  'update-state': { resource: RESOURCES.UPDATE_STATE, action: ACTIONS.UPDATE },
  'delete-state': { resource: RESOURCES.DELETE_STATE, action: ACTIONS.DELETE },
  'create-city': { resource: RESOURCES.CREATE_CITY, action: ACTIONS.CREATE },
  'update-city': { resource: RESOURCES.UPDATE_CITY, action: ACTIONS.UPDATE },
  'delete-city': { resource: RESOURCES.DELETE_CITY, action: ACTIONS.DELETE },
  'manage-users': { resource: RESOURCES.MANAGE_USERS, action: ACTIONS.MANAGE },
  'manage-roles': { resource: RESOURCES.MANAGE_ROLES, action: ACTIONS.MANAGE },
  'view-logs': { resource: RESOURCES.VIEW_LOGS, action: ACTIONS.VIEW },
  'system-config': { resource: RESOURCES.SYSTEM_CONFIG, action: ACTIONS.MANAGE }
};
