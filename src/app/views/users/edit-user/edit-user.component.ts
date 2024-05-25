import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

import { EditUserService } from '../../../services/users/edit-user.service';
import { GetUserByIdService } from 'src/app/services/users/get-user-by-id.service';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})

export class EditUserComponent {

  currentId = 0;

  name= "";
  email= "";
  department= "";
  role= ""; 

  constructor(
    private editUserService: EditUserService,
    private getUserByIdService: GetUserByIdService,
    private route: Router
  ) {}
  
  getUserById(id: number): void {
    this.getUserByIdService.getUserById(id).subscribe({
      next: (response) => {
        this.name = response.name;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editUser(): void {
    this.editUserService.editUser( this.currentId, { name: this.name, email: this.email, department: this.department, role: this.role }).subscribe({
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