import { Component } from '@angular/core';
import { CreateCriterionService } from '../../../services/criteria/create-criterion.service';
import { Router } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
  TextColorDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    CardHeaderComponent,
    TextColorDirective,
    FormSelectDirective,
    FormsModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  name = '';

  constructor(
    private createCriterionService: CreateCriterionService,
    private router: Router
  ) {}

  createCriterion(): void {
    /*this.createCriterionService.postCriterion({ name: this.name }).subscribe({
      next: (response) => {
        console.log('hola');
        console.log(response);
        this.router.navigate(['/criteria']);
      },
      error: (error) => {
        console.log(error);
      },
    });*/
  }
}
