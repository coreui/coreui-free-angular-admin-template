import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-user.component').then(m => m.AddUserComponent),
    data: {
      title: $localize`addusers`
    }
  }
];
