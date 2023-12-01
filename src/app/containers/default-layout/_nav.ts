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
    name: 'Extras'
  },
  {
    name: 'PC',
    url: '/pc',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
    }
  },
  {
    name: 'Budget',
    url: '/budget',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
    }
  },
  {
    name: 'Staff Data',
    url: '/staffdata',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
    }
  },
  {
    name: 'Complaints',
    url: '/complaints',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
    }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
    }
  },
  {
    name: 'VLA',
    url: '/vla',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
    }
  },
  {
    name: 'IMD',
    url: '/imd',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'success',
      text: 'NEW'
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
