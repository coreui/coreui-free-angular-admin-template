import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective,
  TooltipDirective
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TooltipDirective, RouterLink, ButtonDirective, DocsComponentsComponent]
})
export class TooltipsComponent {}
