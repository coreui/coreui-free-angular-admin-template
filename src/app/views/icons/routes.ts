import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Icons'
    },
    children: [
      {
        path: '',
        redirectTo: 'coreui-icons',
        pathMatch: 'full'
      },
      {
        path: 'coreui-icons',
        loadComponent: () => import('./coreui-icons.component').then(m => m.CoreUIIconsComponent),
        data: {
          title: 'CoreUI Icons'
        }
      },
      {
        path: 'brands',
        loadComponent: () => import('./coreui-icons.component').then(m => m.CoreUIIconsComponent),
        data: {
          title: 'Brands'
        }
      },
      {
        path: 'flags',
        loadComponent: () => import('./coreui-icons.component').then(m => m.CoreUIIconsComponent),
        data: {
          title: 'Flags'
        }
      }
    ]
  }
];
