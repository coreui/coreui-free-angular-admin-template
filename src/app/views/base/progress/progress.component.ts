import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ProgressBarDirective, ProgressComponent as ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent } from '@coreui/angular';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent]
})
export class ProgressComponent {

  value = 10;
  variant?: 'striped';

  constructor() {
    setTimeout(() => {
      this.value = 100;
      this.variant = 'striped';
    }, 3000);
  }

}
