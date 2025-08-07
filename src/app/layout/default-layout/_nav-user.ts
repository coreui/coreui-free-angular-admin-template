import { INavData } from '@coreui/angular';

export const navItemsUser: INavData[] = [
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
    name: 'My Account'
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'My Profile',
        url: '/profile/view',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Edit Profile',
        url: '/profile/edit',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Change Password',
        url: '/profile/password',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'My Activities',
    url: '/activities',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'Recent Activities',
        url: '/activities/recent',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'My Reports',
        url: '/activities/reports',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'View Only'
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
    name: 'Reports',
    url: '/reports',
    iconComponent: { name: 'cil-chart' },
    children: [
      {
        name: 'View Reports',
        url: '/reports/view',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Help & Support'
  },
  {
    name: 'Help',
    url: '/help',
    iconComponent: { name: 'cil-question-circle' },
    children: [
      {
        name: 'User Guide',
        url: '/help/guide',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'FAQ',
        url: '/help/faq',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Contact Support',
        url: '/help/contact',
        icon: 'nav-icon-bullet'
      }
    ]
  }
]; 