import { Component } from '@angular/core';
import { EditDepartmentService } from '../../../services/departments/edit-department.service';
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
import { GetDepartmentByIdService } from 'src/app/services/departments/get-department-by-id.service';
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
    private editDepartmentService: EditDepartmentService,
    private getDepartmentByIdService: GetDepartmentByIdService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getDepartmentById(id: number): void {
    this.getDepartmentByIdService.getDepartmentById(id).subscribe({
      next: (response) => {
        this.name = response.name;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editDepartment(): void {
    this.editDepartmentService
      .patchDepartment(this.currentId, { name: this.name })
      .subscribe({
        next: () => {
          this.router.navigate(['/departments']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
    });
    this.getDepartmentById(this.currentId);
  }
}
