import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  RowComponent
} from '@coreui/angular';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, ButtonDirective, RouterLink]
})
export class PasswordChangedComponent {}
