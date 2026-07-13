import { Component, signal } from '@angular/core';
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
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ProgressStackedComponent, ProgressComponent, ProgressBarComponent, DocsComponentsComponent]
})
export class AppProgressComponent {

  readonly value = signal(10);
  readonly variant= signal<'striped'|undefined>(undefined);

  constructor() {
    setTimeout(() => {
      this.value.set(100);
      this.variant.set('striped');
    }, 3000);
  }

}
