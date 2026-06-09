import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormLabelDirective, RowComponent } from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormLabelDirective, FormControlDirective, DocsComponentsComponent]
})
export class RangesComponent {}
