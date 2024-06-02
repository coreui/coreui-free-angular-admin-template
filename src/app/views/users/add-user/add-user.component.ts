import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CardBodyComponent,
         CardComponent,
         FormDirective,
         FormLabelDirective,
         FormSelectDirective,
         FormControlDirective,
         ButtonDirective,
         ButtonGroupComponent,
         ButtonCloseDirective } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  CardBodyComponent,
   CardComponent,
    FormsModule,
     ReactiveFormsModule,
      FormDirective,
       FormLabelDirective,
        FormControlDirective,
          FormSelectDirective,
        ButtonDirective,
       ButtonGroupComponent,
      ButtonCloseDirective,
    RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})

export class AddUserComponent {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  users: User[] = [];
  departments: Department[] = [];

  getDepartments(): void {
    this.usersService.getAllDepartments().subscribe({
      next: (response) => {
        console.log(response);
        this.departments = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  createUser(): void {
     this.usersService.createUser({ name: this.name, email: this.email, password: this.password, birthdate: this.birthdate, departmentId: this.departmentId, role: this.role }).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([`users`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  name= "";
  email= "";
  password= "";
  birthdate= "";
  departmentId= 0;
  role= ""; 

  ngOnInit(): void {
    this.getDepartments();
  }

}
