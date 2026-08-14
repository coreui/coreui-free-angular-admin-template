import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Error pages'
    },
    children: [
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
      },
      {
        path: '404',
        loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
        data: {
          title: 'Page 500'
        }
      }
    ]
  }
];
