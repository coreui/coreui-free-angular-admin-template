import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ListGroupDirective,
  ListGroupItemDirective
} from '@coreui/angular';
import type { Constructor } from '@f123dashboard/shared';

@Component({
  selector: 'app-constructor-card',
  imports: [
    CommonModule,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ListGroupDirective,
    ListGroupItemDirective
  ],
  templateUrl: './constructor-card.component.html',
  styleUrl: './constructor-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorCardComponent {
  constructorData = input.required<Constructor>();
  position = input.required<number>();
}
