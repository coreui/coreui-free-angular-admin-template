import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardBodyComponent,
         CardComponent,
         FormDirective,
         FormLabelDirective,
         FormSelectDirective,
         FormControlDirective,
         ButtonDirective,
         ButtonGroupComponent,
         ButtonCloseDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';

import { AddIndicatorService } from '../../../services/indicators/add-indicator.service';

@Component({
  selector: 'app-add-indicator',
  standalone: true,
  imports: [CardBodyComponent,
    CardComponent,
    FormsModule,
      FormDirective,
       FormLabelDirective,
        FormControlDirective,
         FormSelectDirective,
        ButtonDirective,
       ButtonGroupComponent,
      ButtonCloseDirective,
    RouterLink],
  templateUrl: './add-indicator.component.html',
  styleUrl: './add-indicator.component.scss'
})
export class AddIndicatorComponent {
  constructor(
    private addIndicatorService: AddIndicatorService
  ) {}

  addIndicator(): void {
     this.addIndicatorService.addIndicator({ name: this.name, index: this.index, description: this.description }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  name = '';
  index = 0;
  description = '';
}
