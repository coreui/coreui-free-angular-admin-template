import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
    path: '',
    data: {
      title: 'Usuarios'
    },
    children: [
      {
        path: 'users',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'userslist',
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