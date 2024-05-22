import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { ModalModule } from '@coreui/angular';

import {
  AvatarComponent,
  ButtonDirective,
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
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';

interface IUser {
  name: string;
  email: string;
  registered: string;
  activity: string;
  status: string;
}



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [WidgetsDropdownComponent, TextColorDirective,ModalModule ,CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})



export class UsersComponent {
  public users: IUser[] = [
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    },
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    },
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    },
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    },
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    },
    {
      name: "Anna",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    }
  ];

  editUser(user: IUser) {
    console.log(user);
  }

  deleteUser(user: IUser) {
    console.log(user);
  }


}


