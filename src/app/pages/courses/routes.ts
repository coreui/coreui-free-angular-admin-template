import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./index/index.component').then(c => c.IndexComponent),
        data: {
          title: 'Courses'
        },
      },
      {
        path: ':id',
        loadComponent: () => import('./show/show.component').then(c => c.ShowComponent),
        data: {
          title: 'Courses'
        },
      }
    ]
  }
]
