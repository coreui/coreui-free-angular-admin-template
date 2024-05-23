import { Component } from '@angular/core';
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
import { UsersComponent } from 'src/app/views/users/users.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CardBodyComponent,
     CardComponent,
      UsersComponent,
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

}
