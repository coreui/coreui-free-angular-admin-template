import { NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ModalModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';

import { UsersService } from 'src/app/services/users/users.service';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  birthdate: string;
  role: string;
  department: {
    id: number;
    name: string;
  };
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TextColorDirective,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
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
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  currentId = 0;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  public users: User[] = [];

  public visible = false;

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedUser(): void {
    this.usersService.getPaginatedUser().subscribe({
      next: (response) => {
        console.log(response);
        this.users = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.currentId).subscribe({
      next: () => {
        this.getPaginatedUser();
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  redirectToEdit(id: number): void {
    this.router.navigate([`editusers/${id}`]);
  }

  ngOnInit(): void {
    this.getPaginatedUser();
    
  }
}
