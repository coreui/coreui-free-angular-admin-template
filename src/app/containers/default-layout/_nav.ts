import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    title: true,
    name: 'Settings'
  },
  {
    name: 'Logout',
    url: '/login',
    iconComponent: { name: 'cilLockLocked' }
  }
];
