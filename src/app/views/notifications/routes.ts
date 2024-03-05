import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: '',
        redirectTo: 'badges',
        pathMatch: 'full'
      },
      {
        path: 'alerts',
        loadComponent: () => import('./alerts/alerts.component').then(m => m.AlertsComponent),
        data: {
          title: 'Alerts'
        }
      },
      {
        path: 'badges',
        loadComponent: () => import('./badges/badges.component').then(m => m.BadgesComponent),
        data: {
          title: 'Badges'
        }
      },
      {
        path: 'modal',
        loadComponent: () => import('./modals/modals.component').then(m => m.ModalsComponent),
        data: {
          title: 'Modal'
        }
      },
      {
        path: 'toasts',
        loadComponent: () => import('./toasters/toasters.component').then(m => m.ToastersComponent),
        data: {
          title: 'Toasts'
        }
      }
    ]
  }
];
