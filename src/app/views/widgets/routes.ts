import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./widgets/widgets.component').then(m => m.WidgetsComponent),
    data: {
      title: 'Widgets'
    }
  }
];
