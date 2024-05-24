import { Routes } from '@angular/router';

import {UsersComponent} from './users.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Lista de Usuarios'
    }
  }
];
