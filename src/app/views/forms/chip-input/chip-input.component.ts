import { Component } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ChipInputComponent,
  ColComponent,
  FormLabelDirective,
  FormTextDirective,
  RowComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, DocsComponentsComponent, ChipInputComponent, FormLabelDirective, FormTextDirective]
})
export class AppChipInputComponent {

  readonly #issueColors: Record<string, string> = {
    Approved: 'chip-success',
    Blocking: 'chip-danger',
    Feature: 'chip-primary',
    'Needs review': 'chip-warning'
  };

  readonly issueClassName = (value: string) => this.#issueColors[value] ?? '';
}
