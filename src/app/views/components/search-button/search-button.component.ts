import { Component, signal } from '@angular/core';
import {
  AlertComponent,
  BadgeComponent,
  ButtonCloseDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  OffcanvasBodyComponent,
  OffcanvasComponent,
  OffcanvasHeaderComponent,
  OffcanvasTitleDirective,
  RowComponent,
  SearchButtonComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, DocsComponentsComponent, SearchButtonComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, FormControlDirective, ListGroupDirective, ListGroupItemDirective, BadgeComponent, OffcanvasComponent, OffcanvasHeaderComponent, OffcanvasTitleDirective, OffcanvasBodyComponent, ButtonCloseDirective, AlertComponent]
})
export class AppSearchButtonComponent {

  readonly basicVisible = signal(false);
  readonly offcanvasVisible = signal(false);
  readonly triggerCount = signal(0);
}
