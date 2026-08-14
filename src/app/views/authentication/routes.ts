import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'check-email',
    loadComponent: () => import('./check-email/check-email.component').then(m => m.CheckEmailComponent),
    data: {
      title: 'Check Email Page'
    }
  },
  {
    path: 'password',
    children: [
      {
        path: 'reset',
        loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        data: {
          title: 'Reset Password Page'
        }
      },
      {
        path: 'change',
        loadComponent: () => import('./change-password/change-password.component').then(m => m.ChangePasswordComponent),
        data: {
          title: 'Change Password Page'
        }
      },
      {
        path: 'changed',
        loadComponent: () => import('./password-changed/password-changed.component').then(m => m.PasswordChangedComponent), 
        data: {
          title: 'Changed Password Page'
        }
      }
    ]

  }
];
