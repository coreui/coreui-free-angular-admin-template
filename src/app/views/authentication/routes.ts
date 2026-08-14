import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication'
    },
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        data: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
        data: {
          title: 'Register'
        }
      },
      {
        path: 'check-email',
        loadComponent: () => import('./check-email/check-email.component').then(m => m.CheckEmailComponent),
        data: {
          title: 'Check Email'
        }
      },
      {
        path: 'password',
        children: [
          {
            path: 'reset',
            loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
            data: {
              title: 'Reset Password'
            }
          },
          {
            path: 'change',
            loadComponent: () => import('./change-password/change-password.component').then(m => m.ChangePasswordComponent),
            data: {
              title: 'Change Password'
            }
          },
          {
            path: 'changed',
            loadComponent: () => import('./password-changed/password-changed.component').then(m => m.PasswordChangedComponent),
            data: {
              title: 'Password Changed'
            }
          }
        ]
      }
    ]
  }
];
