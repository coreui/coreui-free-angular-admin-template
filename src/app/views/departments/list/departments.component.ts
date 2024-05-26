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
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';

import { DepartmentsService } from '../../../services/departments/get-paginated-departments.service';
import { DeleteDepartmentService } from '../../../services/departments/delete-department.service';
import { Router } from '@angular/router';

interface Department {
  id: number;
  name: string;
  director: string;
  membersQuantity: number;
}

@Component({
  templateUrl: 'departments.component.html',
  styleUrls: ['departments.component.scss'],
  standalone: true,
  imports: [
    WidgetsDropdownComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    NgStyle,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    WidgetsBrandComponent,
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
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  currentId = 0;

  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  constructor(
    private departmentsService: DepartmentsService,
    private deleteDepartmentService: DeleteDepartmentService,
    private router: Router
  ) {}

  public visible = false;

  toggleModal(id: number) {
    this.visible = !this.visible;
    this.currentId = id;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedDepartments(page: number, take: number): void {
    this.departmentsService.getPaginatedDepartments(page, take).subscribe({
      next: (response) => {
        console.log('entro');
        console.log('paginas:', response.meta.pageCount);
        this.departments = response.data;
        this.pagination.pageCount = response.meta.pageCount;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteDepartment(): void {
    this.deleteDepartmentService.deleteDepartment(this.currentId).subscribe({
      next: () => {
        this.getPaginatedDepartments(this.pagination.page, 10);
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setPage(page: number): void {
    console.log('antes', this.pagination.page);
    if (
      this.pagination.page < 1 ||
      this.pagination.page > this.pagination.pageCount
    ) {
      return;
    }
    this.pagination.page = page;
    console.log('pagina actual', this.pagination.page);
    this.getPaginatedDepartments(this.pagination.page, 10);
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`edit-department/${id}`]);
  }

  ngOnInit(): void {
    this.getPaginatedDepartments(this.pagination.page, 10);
  }
}
