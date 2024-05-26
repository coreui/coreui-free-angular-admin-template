import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
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

import { EditUserService } from '../../../services/users/edit-user.service';
import { GetUserByIdService } from 'src/app/services/users/get-user-by-id.service';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})

export class EditUserComponent {

  currentId = 0;
  currentName = '';

  name= "";
  email= "";
  department= 1;
  role= ""; 

  constructor(
    private editUserService: EditUserService,
    private getUserByIdService: GetUserByIdService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  getUserById(id: number): void {
    this.getUserByIdService.getUserById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.email = response.email;
        this.role = response.role;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editUser(): void {
    console.log(this.name);
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

 ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.currentId = params['id'];
    this.currentName = params['name'];
    console.log('ID:', this.currentId);
    console.log('Nombre:', this.name);
  });

  this.getUserById(this.currentId);
}

}