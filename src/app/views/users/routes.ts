import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users.component').then(m => m.UsersComponent),
    data: {
      title: $localize`users`
    }
  }
];
