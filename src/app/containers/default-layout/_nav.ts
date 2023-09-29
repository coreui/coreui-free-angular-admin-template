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
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Majors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'School',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' },
  //   children:[
  //     {
  //       name:'FPT University'
  //     },
  //     {
  //       name:'Hutech University'
  //     },
  //     {
  //       name:'Van Lang University'
  //     },
  //     {
  //       name:'Hoa Sen University'
  //     },
  //   ]
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  {
    name: 'Majors',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'SE',
        url: '/base/accordion'
      },
      {
        name: 'SS',
        url: '/base/breadcrumbs'
      },
      {
        name: 'SA',
        url: '/base/cards'
      },
      {
        name: 'AI',
        url: '/base/carousel'
      },
      // {
      //   name: 'Collapse',
      //   url: '/base/collapse'
      // },
      // {
      //   name: 'List Group',
      //   url: '/base/list-group'
      // },
      // {
      //   name: 'Navs & Tabs',
      //   url: '/base/navs'
      // },
      // {
      //   name: 'Pagination',
      //   url: '/base/pagination'
      // },
      // {
      //   name: 'Placeholder',
      //   url: '/base/placeholder'
      // },
      // {
      //   name: 'Popovers',
      //   url: '/base/popovers'
      // },
      // {
      //   name: 'Progress',
      //   url: '/base/progress'
      // },
      // {
      //   name: 'Spinners',
      //   url: '/base/spinners'
      // },
      // {
      //   name: 'Tables',
      //   url: '/base/tables'
      // },
      // {
      //   name: 'Tabs',
      //   url: '/base/tabs'
      // },
      // {
      //   name: 'Tooltips',
      //   url: '/base/tooltips'
      // }
    ]
  },
  {
    name: 'School',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'FPT University',
        url: '/buttons/buttons'
      },
      {
        name: 'Hutech University',
        url: '/buttons/button-groups'
      },
      {
        name: 'Van Lang University',
        url: '/buttons/dropdowns'
      }
    ]
  },
  {
    name: 'Intern',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Nguyễn Công Nguyên',
        url: '/forms/form-control'
      },
      {
        name: 'Lê Cao Bằng',
        url: '/forms/select'
      },
      {
        name: 'Trần Tố Mai',
        url: '/forms/checks-radios'
      },
      {
        name: 'Nguyễn Đức Duy',
        url: '/forms/range'
      },
      {
        name: 'Cao Mỹ Duyên',
        url: '/forms/input-group'
      },
      {
        name: 'Lê Lư',
        url: '/forms/floating-labels'
      },
      {
        name: 'Nguyễn Xuân',
        url: '/forms/layout'
      },
      {
        name: 'Đinh Cao Thắng',
        url: '/forms/validation'
      }
    ]
  },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  {
    name: 'Project',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'Breathing Machine',
        url: '/icons/coreui-icons',
        // badge: {
        //   color: 'success',
        //   text: 'FREE'
        // }
      },
      {
        name: 'Blood Testing Machine',
        url: '/icons/flags'
      },
      {
        name: 'Disease Diagnosis Machine',
        url: '/icons/brands'
      }
    ]
  },
  {
    name: 'Semester',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Create New',
        url: '/notifications/alerts'
      },
      {
        name: 'Update',
        url: '/notifications/badges'
      },
      // {
      //   name: 'Modal',
      //   url: '/notifications/modal'
      // },
      // {
      //   name: 'Toast',
      //   url: '/notifications/toasts'
      // }
    ]
  },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  {
    name: 'Login',
    url: '/login',
    iconComponent: { name: 'cil-notes' },
    // children: [
      // {
      //   name: 'Login',
      //   url: '/login'
      // },
      // {
      //   name: 'Register',
      //   url: '/register'
      // },
      // {
      //   name: 'Error 404',
      //   url: '/404'
      // },
      // {
      //   name: 'Error 500',
      //   url: '/500'
      // }
    // ]
  },
  {
    name:'Register',
    url:'/register',
    iconComponent: { name: 'cil-description' }
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'py-0'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/templates/installation',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank', class: '-text-dark' },
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'https://coreui.io/product/angular-dashboard-template/',
  //   iconComponent: { name: 'cil-layers' },
  //   attributes: { target: '_blank' }
  }
];
