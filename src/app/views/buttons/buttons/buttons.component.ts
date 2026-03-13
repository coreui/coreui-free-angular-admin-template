import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, IconDirective, RouterLink, DocsComponentsComponent]
})
export class ButtonsComponent {

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

}
