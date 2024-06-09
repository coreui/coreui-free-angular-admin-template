import { Routes } from '@angular/router';
import { CreateComponent } from './create.component';
export const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    data: {
      title: 'Create department',
    },
  },
];
