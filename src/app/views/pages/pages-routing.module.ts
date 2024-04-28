import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WithdrawListComponent } from './withdraw-list/withdraw-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserWalletComponent } from './user-wallet/user-wallet.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';

const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'withdraw',
    component: WithdrawListComponent,
    data: {
      title: 'Withdrawal List'
    }
  },
  {
    path: 'users',
    component: UserListComponent,
    data: {
      title: 'User List'
    }
  },
  {
    path: 'users-wallet',
    component: UserWalletComponent,
    data: {
      title: 'User Wallet'
    }
  },
  {
    path: 'deposit',
    component: DepositListComponent,
    data: {
      title: 'Deposit List'
    }
  },
  {
    path: 'purchased-packages',
    component: PurchasedListComponent,
    data: {
      title: 'Group Sale'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
