import { Component, OnInit } from '@angular/core';
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
export class AlertsComponent implements OnInit {

  visible = [true, true];
  dismissible = true;

  constructor() { }

  ngOnInit(): void {
  }

  onAlertVisibleChange(eventValue: any = this.visible) {
    this.visible[1] = eventValue;
  }

  onResetDismiss() {
    this.visible = [true, true];
  }

  onToggleDismiss() {
    this.dismissible = !this.dismissible;
  }

}
