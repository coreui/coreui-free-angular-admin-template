import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TooltipDirective, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-tooltips',
    templateUrl: './tooltips.component.html',
    styleUrls: ['./tooltips.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TooltipDirective, RouterLink, ButtonDirective]
})
export class TooltipsComponent {

  constructor() { }

}
