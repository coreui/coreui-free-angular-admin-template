import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ProfileComponent } from './profile/profile.component';
import { StaffdataComponent } from './staffdata/staffdata.component';
import { PcComponent } from './pc/pc.component';
import { VlaComponent } from './vla/vla.component';
import { ImdComponent } from './imd/imd.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'budget',
        component: BudgetComponent,
        data: {
          title: 'Budget'
        }
      },
      {
        path: 'complaints',
        component: ComplaintsComponent,
        data: {
          title: 'Complaints'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'vla',
        component: VlaComponent,
        data: {
          title: 'VLA'
        }
      },
      {
        path: 'imd',
        component: ImdComponent,
        data: {
          title: 'IMD'
        }
      },
      {
        path: 'staffdata',
        component: StaffdataComponent,
        data: {
          title: 'Staff Data'
        }
      },
      {
        path: 'pc',
        component: PcComponent,
        data: {
          title: 'PC'
        }
      }
    ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
}
