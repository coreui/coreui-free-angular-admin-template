import { DOCUMENT, NgStyle } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
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

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';

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
  public departments: Department[] = [
    {
      id: 1,
      name: 'Escuela de Ingenieria Informatica',
      director: 'Hector Ferrer',
      membersQuantity: 30,
    },
    {
      id: 2,
      name: 'Escuela de Ingenieria Industrial',
      director: 'Luis Hernandez',
      membersQuantity: 45,
    },
    {
      id: 1,
      name: 'Escuela de Ingenieria Informatica',
      director: 'Hector Ferrer',
      membersQuantity: 30,
    },
    {
      id: 2,
      name: 'Escuela de Ingenieria Industrial',
      director: 'Luis Hernandez',
      membersQuantity: 45,
    },
    {
      id: 1,
      name: 'Escuela de Ingenieria Informatica',
      director: 'Hector Ferrer',
      membersQuantity: 30,
    },
    {
      id: 2,
      name: 'Escuela de Ingenieria Industrial',
      director: 'Luis Hernandez',
      membersQuantity: 45,
    },
    {
      id: 1,
      name: 'Escuela de Ingenieria Informatica',
      director: 'Hector Ferrer',
      membersQuantity: 30,
    },
    {
      id: 2,
      name: 'Escuela de Ingenieria Industrial',
      director: 'Luis Hernandez',
      membersQuantity: 45,
    },
    {
      id: 1,
      name: 'Escuela de Ingenieria Informatica',
      director: 'Hector Ferrer',
      membersQuantity: 30,
    },
    {
      id: 2,
      name: 'Escuela de Ingenieria Industrial',
      director: 'Luis Hernandez',
      membersQuantity: 45,
    },
    {
      id: 1,
      name: 'Escuela de Ingenieria Informatica',
      director: 'Hector Ferrer',
      membersQuantity: 30,
    },
    {
      id: 2,
      name: 'Escuela de Ingenieria Industrial',
      director: 'Luis Hernandez',
      membersQuantity: 45,
    },
  ];

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  ngOnInit(): void {}
}
