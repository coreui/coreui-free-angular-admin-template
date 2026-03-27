import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./fanta.component').then((m) => m.FantaComponent),
    data: {
      title: $localize`Fanta`
    }
  }
];
