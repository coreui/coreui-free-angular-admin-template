import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';

@Component({
  templateUrl: 'typography.component.html',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ]
})
export class TypographyComponent {}
