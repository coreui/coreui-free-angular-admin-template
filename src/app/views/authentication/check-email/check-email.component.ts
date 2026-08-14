import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ContainerComponent, RowComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-email',
  imports: [
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ColComponent,
    ContainerComponent,
    RouterLink,
    RowComponent
  ],
  templateUrl: './check-email.component.html',
  host: {
    class: 'bg-body-tertiary min-vh-100 d-flex flex-row align-items-center'
  }
})
export class CheckEmailComponent {}
