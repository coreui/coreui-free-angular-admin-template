import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FloatingLabelsComponent } from './floating-labels/floating-labels.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { RangesComponent } from './ranges/ranges.component';
import { SelectComponent } from './select/select.component';
import { ChecksRadiosComponent } from './checks-radios/checks-radios.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidationComponent } from './validation/validation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Intern Profiles'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form-control'
      },
      {
        path: 'form-control',
        component: FormControlsComponent,
        data: {
          title: 'Nguyễn Công Nguyên'
        }
      },
      {
        path: 'select',
        component: SelectComponent,
        data: {
          title: 'Lê Cao Bằng'
        }
      },
      {
        path: 'checks-radios',
        component: ChecksRadiosComponent,
        data: {
          title: 'Trần Tố Mai'
        }
      },
      {
        path: 'range',
        component: RangesComponent,
        data: {
          title: 'Nguyễn Đức Duy'
        }
      },
      {
        path: 'input-group',
        component: InputGroupsComponent,
        data: {
          title: 'Cao Mỹ Duyên'
        }
      },
      {
        path: 'floating-labels',
        component: FloatingLabelsComponent,
        data: {
          title: 'Lê Lư'
        }
      },
      {
        path: 'layout',
        component: LayoutComponent,
        data: {
          title: 'Nguyễn Xuân'
        }
      },
      {
        path: 'validation',
        component: ValidationComponent,
        data: {
          title: 'Đinh Cao Thắng'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
