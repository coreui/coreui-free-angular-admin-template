import { Routes } from '@angular/router';
import { Page404Component } from './page404.component';

export const routes: Routes = [
  {
    path: '',
    component: Page404Component,
    data: {
      title: '404',
    },
  },
];
