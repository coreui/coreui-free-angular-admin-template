import { Component, signal } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, CollapseDirective, RowComponent } from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-collapses',
  templateUrl: './collapses.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, CollapseDirective, DocsComponentsComponent]
})
export class CollapsesComponent {

  readonly collapses = signal([false, false, false, false]);

  toggleCollapse(id: number): void {
    this.collapses.update(visible => visible.map((v, i) => i === id ? !v : v));
  }
}
