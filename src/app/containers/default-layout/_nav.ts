import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'New'
    }
  },
  {
    title: true,
    name: 'Details'
  },
  {
    name: 'PC',
    url: '/pc',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Budget',
    url: '/budget',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Staff Data',
    url: '/staffdata',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Complaints',
    url: '/complaints',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'VLA',
    url: '/vla',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'IMD',
    url: '/imd',
    iconComponent: { name: 'cil-speedometer' }
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
