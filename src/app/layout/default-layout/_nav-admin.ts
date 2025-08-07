import { INavData } from '@coreui/angular';

export const navItemsAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Administration'
  },
  {
    name: 'Masters',
    url: '/masters',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Country Master',
        url: '/masters/country',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'State Master',
        url: '/masters/state',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'City Master',
        url: '/masters/city',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'User Management',
    url: '/users',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'All Users',
        url: '/users/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Add User',
        url: '/users/add',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Roles & Permissions',
        url: '/users/roles',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'System Settings',
    url: '/settings',
    iconComponent: { name: 'cil-gear' },
    children: [
      {
        name: 'General Settings',
        url: '/settings/general',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Security Settings',
        url: '/settings/security',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Backup & Restore',
        url: '/settings/backup',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Reports & Analytics'
  },
  {
    name: 'Reports',
    url: '/reports',
    iconComponent: { name: 'cil-chart' },
    children: [
      {
        name: 'User Reports',
        url: '/reports/users',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'System Reports',
        url: '/reports/system',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Activity Logs',
        url: '/reports/activity',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Analytics',
    url: '/analytics',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Dashboard Analytics',
        url: '/analytics/dashboard',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'User Analytics',
        url: '/analytics/users',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Performance Metrics',
        url: '/analytics/performance',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Development'
  },
  {
    name: 'Role Demo',
    url: '/role-demo',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'ACL Demo',
    url: '/acl-demo',
    iconComponent: { name: 'cil-shield-alt' }
  },
  {
    name: 'Components',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Base Components',
        url: '/base',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Buttons',
        url: '/buttons',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Forms',
        url: '/forms',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Notifications',
        url: '/notifications',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Theme',
    url: '/theme',
    iconComponent: { name: 'cil-palette' },
    children: [
      {
        name: 'Colors',
        url: '/theme/colors',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Typography',
        url: '/theme/typography',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Icons',
        url: '/icons',
        icon: 'nav-icon-bullet'
      }
    ]
  }
]; 