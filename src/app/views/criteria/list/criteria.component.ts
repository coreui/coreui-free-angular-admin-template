import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AvatarComponent,
  ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  ThemeDirective,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';

import { CriteriaService } from '../../../services/criteria/get-paginated-criteria.service';
import { DeleteCriterionService } from '../../../services/criteria/delete-criterion.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'criteria.component.html',
  styleUrls: ['criteria.component.scss'],
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    RouterLink,
  ],
})
export class CriteriaComponent implements OnInit {
  criteria: any = [];

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

  constructor(
    private criteriaService: CriteriaService,
    private deleteCriterionService: DeleteCriterionService,
    private router: Router
  ) {}

  getPaginatedCriteria(page: number, take: number): void {
    this.criteriaService.getPaginatedCriteria(page, take).subscribe({
      next: (response) => {
        this.criteria = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`edit-criterion/${id}`]);
  }

  public visible = false;

  toggleModal(id: number) {
    this.visible = !this.visible;
    this.currentId = id;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  deleteCriterion(): void {
    this.deleteCriterionService.deleteCriterion(this.currentId).subscribe({
      next: () => {
        this.getPaginatedCriteria(this.pagination.page, 10);
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pagination.pageCount) return;
    this.pagination.page = page;
  }
  ngOnInit(): void {
    this.getPaginatedCriteria(this.pagination.page, 10);
  }
}
