import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalModule,
  ThemeDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  PageLinkDirective,
  PaginationComponent,
  PageItemDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';

import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { NgxPaginationModule } from 'ngx-pagination';

interface indicator {
  id: number;
  name: string;
  index: number;
  description: string;
}

@Component({
  selector: 'app-indicators',
  standalone: true,
  imports: [
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CommonModule,
    CardHeaderComponent,
    TableDirective,
    ButtonCloseDirective,
    ButtonDirective,
    ModalModule,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    IconDirective,
    NgxPaginationModule,
    RouterLink,
  ],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss',
})
export class IndicatorsComponent {
  constructor(
    private router: Router,
    private indicatorsService: IndicatorsService
  ) {}

  currentId = 0;
  public visible = false;

  public indicators: indicator[] = [];
  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedIndicator(page: number, take: number): void {
    this.indicatorsService
      .getPaginatedIndicator(this.pagination.page, this.pagination.take)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.indicators = response.data;
          this.pagination = response.meta;
        },
        error: (error) =>
          console.error('Error al realizar la solicitud:', error),
      });
  }

  deleteIndicator(): void {
    this.indicatorsService.deleteIndicator(this.currentId).subscribe({
      next: () => {
        this.getPaginatedIndicator(this.pagination.page, this.pagination.take);
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`editIndicators/${id}`]);
  }

  setPage(page: number): void {
    this.pagination.page = page;
    this.getPaginatedIndicator(this.pagination.page, this.pagination.take);
  }

  ngOnInit(): void {
    this.getPaginatedIndicator(this.pagination.page, this.pagination.take);
  }
}
