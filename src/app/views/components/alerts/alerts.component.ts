import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertComponent,
  AlertHeadingDirective,
  AlertLinkDirective,
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TemplateIdDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, AlertComponent, AlertLinkDirective, RouterLink, AlertHeadingDirective, IconDirective, TemplateIdDirective, ButtonCloseDirective, ButtonDirective, DocsComponentsComponent]
})
export class AlertsComponent {

  readonly visible1 = signal(true);
  readonly visible2 = signal(true);
  readonly dismissible = signal(true);

  onAlertVisibleChange(visible: boolean = this.visible2()) {
    this.visible2.set(visible);
  }

  onResetDismiss() {
    this.visible1.set(true);
    this.visible2.set(true);
  }

  onToggleDismiss() {
    this.dismissible.update(value => !value);
  }

}
