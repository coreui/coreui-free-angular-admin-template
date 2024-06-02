import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { Department } from '../add-user/add-user.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CardBodyComponent,
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})

export class EditUserComponent {

  currentId = 0;
  currentName = '';

  name= "";
  email= "";
  departmentId= 0;
  role= ""; 

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
       console.log(response);
       this.router.navigate([`users`]);
     },
     error: (error) => {
       console.log(error);
     },
   });
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