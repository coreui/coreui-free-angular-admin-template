import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BadgesComponent } from './badges/badges.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ModalsComponent } from './modals/modals.component';
import { ToastersComponent } from './toasters/toasters.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Semester'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'badges'
      },
      {
        path: 'alerts',
        component: AlertsComponent,
        data: {
          title: 'Create New'
        }
      },
      {
        path: 'badges',
        component: BadgesComponent,
        data: {
          title: 'Update'
        }
      },
      {
        path: 'modal',
        component: ModalsComponent,
        data: {
          title: 'Modal'
        }
      },
      {
        path: 'toasts',
        component: ToastersComponent,
        data: {
          title: 'Toasts'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
