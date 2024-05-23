import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  currentId = 0;
  constructor(
    private departmentsService: DepartmentsService,
    private deleteDepartmentService: DeleteDepartmentService
  ) {}

  public visible = false;

  toggleModal(id: number) {
    this.visible = !this.visible;
    this.currentId = id;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedDepartments(): void {
    this.departmentsService.getPaginatedDepartments().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteDepartment(): void {
    this.deleteDepartmentService.deleteDepartment(this.currentId).subscribe({
      next: () => {
        this.getPaginatedDepartments();
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getPaginatedDepartments();
  }
}
