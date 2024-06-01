import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./edit-user.component').then(m => m.EditUserComponent),
    data: {
      title: $localize`editusers`
    }
  }
];
