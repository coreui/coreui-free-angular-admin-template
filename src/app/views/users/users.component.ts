import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
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
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ModalModule
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
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
  imports: [WidgetsDropdownComponent, TextColorDirective,PaginationComponent, PageItemDirective,
    PageLinkDirective, CardComponent, ModalModule, CardBodyComponent, RowComponent, ColComponent, ButtonDirective,ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent, FormsModule],
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
      name: "Ana",
      email: "anna@gmail.com",
      registered: "Hoy",
      activity: "Seguridad",
      status: "Proteger a los ucabistas"
    }
  ];

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}


