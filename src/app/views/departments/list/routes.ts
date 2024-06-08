import { Routes } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
export const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    data: {
      title: 'Departments',
    },
  },
];
