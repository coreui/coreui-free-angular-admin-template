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
import { GetAllIndicatorsService } from 'src/app/services/indicators/get-all-indicators.service';
import { EditCriterionService } from 'src/app/services/criteria/edit-criterion.service';

import { Indicator } from 'src/app/types';
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
  description = '';
  index = 0;
  indicatorID = 0;

  indicators: Indicator[] = [];

  constructor(
    private editCriterionService: EditCriterionService,
    private getCriterionByIdService: GetCriterionByIdService,
    private router: Router,
    private getIndicatorsService: GetAllIndicatorsService,
    private route: ActivatedRoute
  ) {}

  getIndicators(): void {
    this.getIndicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        console.log(response);
        this.indicators = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  getCriterionById(id: number): void {
    this.getCriterionByIdService.getCriterionById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.name = response.name;
        this.description = response.description;
        this.indicatorID = response.indicatorID;
        this.index = response.index;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editCriterion(): void {
    this.editCriterionService
      .patchCriterion(this.currentId, {
        name: this.name,
        description: this.description,
        indicatorID: this.indicatorID,
        index: this.index,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/criteria']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    this.getIndicators();
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getCriterionById(this.currentId);
  }
}
