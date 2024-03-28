import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        redirectTo: 'form-control',
        pathMatch: 'full'
      },
      {
        path: 'form-control',
        loadComponent: () => import('./form-controls/form-controls.component').then(m => m.FormControlsComponent),
        data: {
          title: 'Form Control'
        }
      },
      {
        path: 'select',
        loadComponent: () => import('./select/select.component').then(m => m.SelectComponent),
        data: {
          title: 'Select'
        }
      },
      {
        path: 'checks-radios',
        loadComponent: () => import('./checks-radios/checks-radios.component').then(m => m.ChecksRadiosComponent),
        data: {
          title: 'Checks & Radios'
        }
      },
      {
        path: 'range',
        loadComponent: () => import('./ranges/ranges.component').then(m => m.RangesComponent),
        data: {
          title: 'Range'
        }
      },
      {
        path: 'input-group',
        loadComponent: () => import('./input-groups/input-groups.component').then(m => m.InputGroupsComponent),
        data: {
          title: 'Input Group'
        }
      },
      {
        path: 'floating-labels',
        loadComponent: () => import('./floating-labels/floating-labels.component').then(m => m.FloatingLabelsComponent),
        data: {
          title: 'Floating Labels'
        }
      },
      {
        path: 'layout',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        data: {
          title: 'Layout'
        }
      },
      {
        path: 'validation',
        loadComponent: () => import('./validation/validation.component').then(m => m.ValidationComponent),
        data: {
          title: 'Validation'
        }
      }
    ]
  }
];
