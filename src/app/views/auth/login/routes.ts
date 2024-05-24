import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
];
