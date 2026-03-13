import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormFloatingDirective,
  FormLabelDirective,
  FormSelectDirective,
  GutterDirective,
  RowComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-floating-labels',
  templateUrl: './floating-labels.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormFloatingDirective, FormControlDirective, FormLabelDirective, ReactiveFormsModule, FormsModule, FormDirective, FormSelectDirective, GutterDirective, DocsComponentsComponent]
})
export class FloatingLabelsComponent {}
