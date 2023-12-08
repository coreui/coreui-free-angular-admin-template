import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { PcCardComponent } from './pc-card/pc-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ComplaintsCardComponent } from './complaints-card/complaints-card.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'budget-card',
        component: BudgetCardComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'pc-card',
        component: PcCardComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'complaints-card',
        component: ComplaintsCardComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'profile-card',
        component: ProfileCardComponent,
        data: {
          title: ''
        }
      }
    ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule {
}
