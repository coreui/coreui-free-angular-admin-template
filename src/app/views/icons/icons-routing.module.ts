import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreUIIconsComponent } from './coreui-icons.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Project List'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'coreui-icons'
      },
      {
        path: 'coreui-icons',
        component: CoreUIIconsComponent,
        data: {
          title: 'Breathing Machine'
        }
      },
      {
        path: 'brands',
        component: CoreUIIconsComponent,
        data: {
          title: 'Blood Testing Machine'
        }
      },
      {
        path: 'flags',
        component: CoreUIIconsComponent,
        data: {
          title: 'Disease Diagnosis Machine'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {
}
