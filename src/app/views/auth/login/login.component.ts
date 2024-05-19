import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    FormsModule,
  ],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    this.loginService
      .postLogin({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.role);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['/dashboard']);
        },
        error: (error) =>
          console.error('Error al realizar la solicitud:', error),
      });
  }
}
