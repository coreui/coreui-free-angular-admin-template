import { INavData } from '@coreui/angular';

export const navItemsAll: INavData[] = [
  {
    title: true,
    name: 'Pages'
  },
  {
    name: 'Withdrawal List',
    url: '/pages/withdraw',
    iconComponent: { name: 'cil-cursor' }
  },
  {
    name: 'Users List',
    url: '/pages/users',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Users Wallet',
    url: '/pages/users-wallet',
    iconComponent: { name: 'cil-layers' }
  },
  {
    name: 'Deposit List',
    url: '/pages/deposit',
    iconComponent: { name: 'cil-cloud-download' }
  }
];


export const navItemsWithdrawal: INavData[] = [
  {
    title: true,
    name: 'Pages'
  },
  {
    name: 'Withdrawal List',
    url: '/pages/withdraw',
    iconComponent: { name: 'cil-cursor' }
  }
];


export const navItemsMember: INavData[] = [
  {
    title: true,
    name: 'Pages'
  },
  {
    name: 'Users List',
    url: '/pages/users',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Users Wallet',
    url: '/pages/users-wallet',
    iconComponent: { name: 'cil-layers' }
  }
];
