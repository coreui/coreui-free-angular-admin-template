import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './auth.guard';
export const routes: Routes = [
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./views/auth/login/routes').then((m) => m.routes),
  },
  {
    path: 'auth/register',
    loadChildren: () =>
      import('./views/auth/register/routes').then((m) => m.routes),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home',
    },

    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/routes').then((m) => m.routes),
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/routes').then((m) => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/routes').then((m) => m.routes),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/routes').then((m) => m.routes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/routes').then((m) => m.routes),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/routes').then((m) => m.routes),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/routes').then((m) => m.routes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/list-users/routes').then((m) => m.routes),
      },
      {
        path: 'addusers',
        loadChildren: () =>
          import('./views/users/add-user/routes').then((m) => m.routes),
      },
      {
        path: 'editusers/:id',
        loadChildren: () =>
          import('./views/users/edit-user/routes').then((m) => m.routes),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./views/pages/page404/routes').then((m) => m.routes),
      },
    ],
  },

  /*
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    data: {
      title: 'Register Page',
    },
  },
  */
];
