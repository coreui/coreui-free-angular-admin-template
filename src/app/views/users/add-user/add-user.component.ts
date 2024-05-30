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
import { FormsModule } from '@angular/forms';

import { CreateUserService } from '../../../services/users/create-user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CardBodyComponent,
     CardComponent,
     FormsModule,
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
    private createUserService: CreateUserService,
    private router: Router
  ) {}

  createUser(): void {
     this.createUserService.createUser({ name: this.name, email: this.email, password: this.password, birthdate: this.birthdate, departmentId: this.departmentId, role: this.role }).subscribe({
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


}
