import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardBodyComponent,
   CardComponent,
    FormDirective,
     FormLabelDirective,
      FormSelectDirective,
       FormControlDirective,
       ButtonDirective,
       ButtonGroupComponent,
       ButtonCloseDirective } from '@coreui/angular';
import { User } from 'src/app/views/users/users/users.component';

import { CreateUserService } from '../../../services/users/create-user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CardBodyComponent,
     CardComponent,
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

  name= "";
  email= "";
  department= "";
  role= ""; 

  constructor(
    private createUserService: CreateUserService
  ) {}

  createUser(): void {
     this.createUserService.createUser({ name: this.name, email: this.email, department: this.department, role: this.role }).subscribe({
      next: (response) => {
        console.log('hola');
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
