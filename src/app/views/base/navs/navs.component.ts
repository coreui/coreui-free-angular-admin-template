import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  RowComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, NavComponent, NavItemComponent, NavLinkDirective, RouterLink, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DocsComponentsComponent]
})
export class NavsComponent {}
