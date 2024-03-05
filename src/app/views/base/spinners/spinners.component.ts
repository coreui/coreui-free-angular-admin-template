import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, SpinnerComponent, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-spinners',
    templateUrl: './spinners.component.html',
    styleUrls: ['./spinners.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, SpinnerComponent, ButtonDirective]
})
export class SpinnersComponent {

  constructor() { }

}
