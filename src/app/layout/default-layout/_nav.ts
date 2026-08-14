import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
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
    name: 'UI Elements'
  },
  {
    name: 'Charts',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts'
  },
  {
    name: 'Components',
    url: '/components',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/components/accordion',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Alerts',
        url: '/components/alerts',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Badge',
        url: '/components/badge',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Breadcrumb',
        url: '/components/breadcrumb',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Buttons',
        url: '/components/buttons',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Buttons Group',
        url: '/components/button-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Calendar',
        url: 'https://coreui.io/angular/docs/components/calendar/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Cards',
        url: '/components/cards',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Carousel',
        url: '/components/carousel',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Collapse',
        url: '/components/collapse',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Dropdowns',
        url: '/components/dropdowns',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'List group',
        url: '/components/list-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Loading Button',
        url: 'https://coreui.io/angular/docs/components/loading-button/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Modals',
        url: '/components/modals',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Navs & Tabs',
        url: '/components/navs-tabs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Pagination',
        url: '/components/pagination',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Placeholders',
        url: '/components/placeholders',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Popovers',
        url: '/components/popovers',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Progress',
        url: '/components/progress',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Smart Pagination',
        url: 'https://coreui.io/angular/docs/components/smart-pagination/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Smart Table',
        url: 'https://coreui.io/angular/docs/components/smart-table/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Spinners',
        url: '/components/spinners',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tables',
        url: '/components/tables',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tabs',
        url: '/components/tabs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Toasts',
        url: '/components/toasts',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tooltips',
        url: '/components/tooltips',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Autocomplete',
        url: 'https://coreui.io/angular/docs/forms/autocomplete/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Form Control',
        url: '/forms/form-control',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Date Picker',
        url: 'https://coreui.io/angular/docs/forms/date-picker/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Date Range Picker',
        url: 'https://coreui.io/angular/docs/forms/date-range-picker/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Multi Select',
        url: 'https://coreui.io/angular/docs/forms/multi-select/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'OTP Input',
        url: 'https://coreui.io/angular/docs/forms/otp/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Password Input',
        url: 'https://coreui.io/angular/docs/forms/password-input/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Range',
        url: '/forms/range',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Range Slider',
        url: 'https://coreui.io/angular/docs/forms/range-slider/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Rating',
        url: 'https://coreui.io/angular/docs/forms/rating/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Select',
        url: '/forms/select',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Stepper',
        url: 'https://coreui.io/angular/docs/forms/stepper/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Time Picker',
        url: 'https://coreui.io/angular/docs/forms/time-picker/',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'danger',
          text: 'PRO'
        },
        attributes: { target: '_blank' }
      },
      {
        name: 'Layout',
        url: '/forms/layout',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Validation',
        url: '/forms/validation',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Authentication',
    url: '/authentication',
    iconComponent: { name: 'cil-lock-locked' },
    children: [
      {
        name: 'Login',
        url: '/authentication/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/authentication/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Check Email',
        url: '/authentication/check-email',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Forgot password',
        url: '/authentication/reset-password',
        icon: 'nav-icon-bullet',
        children: [
          {
            name: 'Reset Password',
            url: '/authentication/reset-password',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Change Password',
            url: '/authentication/change-password',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Password Changed',
            url: '/authentication/password-changed',
            icon: 'nav-icon-bullet'
          }
        ]
      }
    ]
  },
  {
    name: 'Error pages',
    url: '/error-pages',
    iconComponent: { name: 'cil-bug' },
    children: [
      {
        name: 'Error 404',
        url: '/error-pages/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/error-pages/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
