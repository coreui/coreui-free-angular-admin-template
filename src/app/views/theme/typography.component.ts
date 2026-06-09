import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';

@Component({
  templateUrl: 'typography.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ]
})
export class TypographyComponent {}
