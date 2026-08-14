import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TooltipDirective
} from '@coreui/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, InputGroupComponent, InputGroupTextDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, IconDirective, ButtonDirective, TooltipDirective, RouterLink]
})
export class LoginComponent {}
