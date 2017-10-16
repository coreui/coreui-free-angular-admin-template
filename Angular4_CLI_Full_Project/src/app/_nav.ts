export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'UI elements'
  },
  {
    name: 'Components',
    url: '/components',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Buttons',
        url: '/components/buttons',
        icon: 'icon-puzzle'
      },
      {
        name: 'Social Buttons',
        url: '/components/social-buttons',
        icon: 'icon-puzzle'
      },
      {
        name: 'Cards',
        url: '/components/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/components/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Modals',
        url: '/components/modals',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/components/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/components/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/components/tabs',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/pages/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/pages/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/pages/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/pages/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success'
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger'
  }
];
