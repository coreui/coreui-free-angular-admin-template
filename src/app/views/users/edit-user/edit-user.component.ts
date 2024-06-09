import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { Department } from '../add-user/add-user.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonGroupComponent,
    ButtonCloseDirective,
    CardBodyComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    RouterLink,
    ToasterComponent, 
    ToastComponent, 
    ToastHeaderComponent,
    ToastBodyComponent
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})

export class EditUserComponent implements OnInit {

  currentId = 0;
  currentName = '';

  toastMessage = ''; 
  toastClass: string = ''; 

  name= "";
  email= "";
  departmentId= 0;
  role= "";
  position = 'top-end';
  visible = false;
  percentage = 0;

  departments: Department[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  getUserById(id: number): void {
    this.usersService.getUserById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.email = response.email;
        this.role = response.role;
        this.departmentId = response.departmentId;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getDepartments(): void {
    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editUser(): void {
    this.usersService.editUser( this.currentId,
       { name: this.name, email: this.email, department: this.departmentId, role: this.role }).subscribe({
     next: (response) => {
      this.toggleToast('Usuario editado exitosamente', true);
      setTimeout(() => {
        this.router.navigate([`users`]); 
      },1500)
     },
     error: (error) => {
      this.toggleToast('Error al editar usuario', false); 
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
  this.route.params.subscribe((params) => {
    this.currentId = params['id'];
    this.currentName = params['name'];
  });

  this.getUserById(this.currentId);
}

}
