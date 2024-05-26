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
import { FormsModule } from '@angular/forms';

import { CreateUserService } from '../../../services/users/create-user.service';
import { GetPaginatedUserService } from 'src/app/services/users/get-paginated-user.service';

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

  name= "";
  email= "";
  password= "";
  birthdate= "";
  department= 1;
  role= ""; 

  constructor(
    private createUserService: CreateUserService
  ) {}

  createUser(): void {
     this.createUserService.createUser({ name: this.name, email: this.email, password: this.password, birthdate: this.birthdate, department: this.department, role: this.role }).subscribe({
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
