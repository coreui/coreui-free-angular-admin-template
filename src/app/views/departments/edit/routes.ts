import { Routes } from '@angular/router';
import { EditComponent } from './edit.component';
export const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    data: {
      title: 'Edit department',
    },
  },
];
