import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import {
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

interface IUser {
  name: string;
  email: string;
  department: string;
  rol: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ TextColorDirective,
             PaginationComponent,
             PageItemDirective,
             PageLinkDirective,
             CardComponent,
             ModalModule,
             CardBodyComponent,
             RowComponent,
             ColComponent,
             ButtonDirective,
             ModalComponent,
             ModalHeaderComponent,
             ModalTitleDirective,
             ThemeDirective,
             ButtonCloseDirective,
             ModalBodyComponent,
             ModalFooterComponent,
             IconDirective,
             ReactiveFormsModule,
             ButtonGroupComponent,
             NgStyle,
             CardFooterComponent,
             CardHeaderComponent,
             TableDirective,
             FormsModule,
             RouterLink
            ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {
  
  public users: IUser[] = [
    {
      name: "Anna",
      email: "anna@gmail.com",
      department: "Hoy",
      rol: "Seguridad",
    },
    {
      name: "Ana",
      email: "anna@gmail.com",
      department: "Hoy",
      rol: "Seguridad", 
    },
    {
      name: "Anna",
      email: "anna@gmail.com",
      department: "Hoy",
      rol: "Seguridad",
    },
    {
      name: "Ana",
      email: "anna@gmail.com",
      department: "Hoy",
      rol: "Seguridad", 
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


