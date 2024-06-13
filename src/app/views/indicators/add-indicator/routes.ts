import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-indicator.component').then(m => m.AddIndicatorComponent),
    data: {
      title: $localize`addIndicators`
    }
  }
];