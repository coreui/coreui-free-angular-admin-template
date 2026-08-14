import { Component } from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  RowComponent
} from '@coreui/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective]
})
export class ChangePasswordComponent {}
