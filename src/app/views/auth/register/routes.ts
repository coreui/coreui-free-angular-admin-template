import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    data: {
      title: 'Register',
    },
  },
];
