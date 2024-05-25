import { Routes } from '@angular/router';
import { CriteriaComponent } from './criteria.component';
export const routes: Routes = [
  {
    path: '',
    component: CriteriaComponent,
    data: {
      title: 'Criteria',
    },
  },
];
