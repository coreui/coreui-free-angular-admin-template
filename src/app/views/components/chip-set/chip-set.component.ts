import { Component, signal } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ChipItem,
  ChipSetComponent,
  ColComponent,
  RowComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-chip-set',
  templateUrl: './chip-set.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, DocsComponentsComponent, ChipSetComponent]
})
export class AppChipSetComponent {

  readonly fruits: ChipItem[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' }
  ];

  readonly teams: ChipItem[] = [
    { value: 'design', label: 'Design' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' }
  ];

  readonly sizes: ChipItem[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  readonly selectedTeams = signal(['development', 'sales']);
  readonly selectedSize = signal(['small']);
  readonly selectedDepartments = signal(['development', 'sales']);

  readonly filters = signal<(string | ChipItem)[]>([
    'Filter one',
    'Filter two',
    { value: 'filter-three', label: 'Filter three', disabled: true }
  ]);
}
