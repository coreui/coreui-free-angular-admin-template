import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  CardGroupComponent,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  birthdate = '';

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  register(): void {
    this.registerService
      .postRegister({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        role: this.role,
        birthdate: this.birthdate,
      })
      .subscribe({
        next: (response) => {
          alert(`Usuario ${response.name} ha sido registrado correctamente`);
          this.router.navigate(['/dashboard']);
        },
        error: (error) =>
          console.error('Error al realizar la solicitud:', error),
      });
  }
}
