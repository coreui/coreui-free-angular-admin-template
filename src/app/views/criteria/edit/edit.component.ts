import { Component } from '@angular/core';
//import { EditCriteriaervice } from '../../../services/criteria/edit-criterion.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { GetCriterionByIdService } from 'src/app/services/criteria/get-criterion-by-id.service';
@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  currentId = 0;
  name = '';

  constructor(
    //private editCriteriaervice: EditCriteriaervice,
    private getCriterionByIdService: GetCriterionByIdService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /*
  getCriterionById(id: number): void {
    this.getCriterionByIdService.getCriterionById(id).subscribe({
      next: (response) => {
        this.name = response.name;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  } */

  editCriterion(): void {
    /*this.editCriteriaervice
      .patchCriterion(this.currentId, { name: this.name })
      .subscribe({
        next: () => {
          this.router.navigate(['/criteria']);
        },
        error: (error) => {
          console.log(error);
        },
      });*/
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    //this.getCriterionById(this.currentId);
  }
}
