import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ProgressBarComponent,
  ProgressComponent,
  ProgressStackedComponent,
  RowComponent
} from '@coreui/angular';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ProgressStackedComponent, ProgressComponent, ProgressBarComponent]
})
export class AppProgressComponent {

  constructor() {
    setTimeout(() => {
      this.value = 100;
      this.variant = 'striped';
    }, 3000);
  }

  value = 10;
  variant?: 'striped';

}
