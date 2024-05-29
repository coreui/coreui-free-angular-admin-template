import { Component } from '@angular/core';
import { GetAllIndicatorsService } from '../../../services/indicators/get-all-indicators.service';
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
import { Indicator } from 'src/app/types';
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
  description = '';
  index = 0;
  indicatorID = 0;

  indicators: Indicator[] = [];

  currentId = 0;

  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  pages = this.pagination.pageCount;

  getIndicators(): void {
    this.getIndicatorsService.getAllIndicators().subscribe({
      next: (response) => {
        console.log(response);
        this.indicators = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  constructor(
    private createCriterionService: CreateCriterionService,
    //private criteriaService: CriteriaService,
    //private deleteCriteriaervice: DeleteCriteriaervice,
    private getIndicatorsService: GetAllIndicatorsService,
    private router: Router
  ) {}

  createCriterion(): void {
    this.createCriterionService
      .postCriterion({
        name: this.name,
        description: this.description,
        index: this.index,
        indicatorID: this.indicatorID,
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
  }
}
