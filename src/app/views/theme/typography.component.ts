import { Component } from '@angular/core';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';

@Component({
    templateUrl: 'typography.component.html',
    standalone: true,
    imports: [
        TextColorDirective,
        CardComponent,
        CardHeaderComponent,
        CardBodyComponent,
    ],
})
export class TypographyComponent {
  constructor() {}
}
