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
    iconComponent: { name: 'cilChartPie' }
  },
  {
    name: 'Budget',
    url: '/budget',
    iconComponent: { name: 'cilCreditCard' }
  },
  {
    name: 'Staff Data',
    url: '/staffdata',
    iconComponent: { name: 'cilPeople' }
  },
  {
    name: 'Complaints',
    url: '/complaints',
    iconComponent: { name: 'cilShareBoxed' }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-Spreadsheet' }
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
