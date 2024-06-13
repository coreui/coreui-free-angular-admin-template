import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  ToastBodyComponent,
  ToastComponent,
  ToastHeaderComponent,
  ToasterComponent,
  ModalModule,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { NgStyle } from '@angular/common';
import { UsersService } from 'src/app/services/users/users.service';
import { NgxPaginationModule } from 'ngx-pagination';

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
    ReactiveFormsModule,
    ProgressBarComponent,
    ProgressBarDirective,
    ProgressComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    RouterLink,
    NgxPaginationModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  currentId = 0;
  position = 'top-end';
  percentage = 0;
  toastMessage = '';
  toastClass = '';
  visibleModal = false;
  visible = false;
  pagination = {
    page: 1,
    take: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };

  constructor(private usersService: UsersService, private router: Router) {}

  public users: User[] = [];

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visibleModal = !this.visibleModal;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedUser(page: number, take: number): void {
    this.usersService.getPaginatedUser(page, take).subscribe({
      next: (response) => {
        this.users = response.data;
        this.pagination = response.meta;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.currentId).subscribe({
      next: () => {
        this.getPaginatedUser(this.pagination.page, this.pagination.take);
        this.visible = false;
        this.toggleToast('Usuario eliminado exitosamente', true); // Mostrar toast de éxito después de eliminar
      },
      error: (error) => {
        this.toggleToast('Error al eliminar usuario', false); // Mostrar toast de error
        console.log(error);
      },
    });
  }

  toggleToast(message: string, success: boolean): void {
    this.visible = true;
    this.percentage = 100;
    if (success) {
      this.toastMessage = message;
      this.toastClass = 'toast-success';
    } else {
      this.toastMessage = message;
      this.toastClass = 'toast-error';
    }
  }

  redirectToEdit(id: number): void {
    this.router.navigate([`editusers/${id}`]);
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 34;
  }

  setPage(page: number): void {
    this.pagination.page = page;
    this.getPaginatedUser(this.pagination.page, this.pagination.take);
  }

  ngOnInit(): void {
    this.getPaginatedUser(this.pagination.page, this.pagination.take);
  }
}
