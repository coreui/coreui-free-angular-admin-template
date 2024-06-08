import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { 
  ButtonDirective,
  ButtonGroupComponent,
  ButtonCloseDirective,
  CardBodyComponent,
  CardComponent,
  FormDirective,
  FormControlDirective,
  FormLabelDirective,
  FormSelectDirective,
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import { User } from '../list-users/list.component';
import { UsersService } from 'src/app/services/users/users.service';

export interface Department {
  id: number;
  name: string;
  director: string;
  membersQuantity: number;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonGroupComponent,
    ButtonCloseDirective,
    CardBodyComponent,
    CardComponent,
    FormDirective,
    FormControlDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormsModule,
    IconDirective,
    ReactiveFormsModule,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    RouterLink,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  toastMessage = ''; 
  toastClass: string = ''; 

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  users: User[] = [];
  departments: Department[] = [];
  name = "";
  email = "";
  password = "";
  birthdate = "";
  departmentId = 0;
  role = ""; 
  position = 'top-end';
  visible = false;
  percentage = 0;

  getDepartments(): void {
    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }
  
  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  createUser(): void {
    this.usersService.createUser({ 
      name: this.name, 
      email: this.email, 
      password: this.password, 
      birthdate: this.birthdate, 
      departmentId: this.departmentId, 
      role: this.role 
    }).subscribe({
      next: (response) => {
        this.toggleToast('Usuario creado exitosamente', true); // Mostrar toast de éxito
        setTimeout(() => {
          this.router.navigate([`users`]); 
        },1500)
      },
      error: (error) => {
        this.toggleToast('Error al crear usuario', false); 
        console.log(error);
      },
    });
  }

  toggleToast(message: string, success: boolean): void {
    this.visible = true;
    this.percentage = 100;
    if (success) {
      this.toastMessage = message;
      this.toastClass = 'toast-success';
    } else {
      this.toastMessage = message;
      this.toastClass = 'toast-error';
    }
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 100;
  }

  ngOnInit(): void {
    this.getDepartments();
  }
}
