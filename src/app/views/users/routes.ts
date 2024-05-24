import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
    path: '',
    data: {
      title: 'Usuarios'
    },
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
        data: {
          title: 'Listado'
        }
      },
      {
        path: 'adduser',
        loadComponent: () => import('./add-user/add-user.component').then(m => m.AddUserComponent),
        data: {
          title: 'Agregar Usuario'
        }
      }
    ]
  }
];