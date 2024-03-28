import { Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';

export const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    data: {
      title: 'Charts'
    }
  }
];
