import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./indicators.component').then(m => m.IndicatorsComponent),
    data: {
      title: $localize`Indicators`
    }
  }
];