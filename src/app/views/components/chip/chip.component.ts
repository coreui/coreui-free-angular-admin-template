import { Component, signal } from '@angular/core';
import {
  AvatarComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ChipComponent,
  ColComponent,
  RowComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, DocsComponentsComponent, ChipComponent, AvatarComponent, IconDirective]
})
export class AppChipComponent {

  readonly removed = signal<string[]>([]);

  remove(chip: string, next: ChipComponent) {
    next.focus();
    this.removed.update(removed => [...removed, chip]);
  }
}
