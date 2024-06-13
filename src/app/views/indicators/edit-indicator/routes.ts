import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./edit-indicator.component').then(m => m.EditIndicatorComponent),
    data: {
      title: $localize`editIndicators`
    }
  }
];