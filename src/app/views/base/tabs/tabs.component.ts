import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { RouterLink } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  RoundedDirective,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent,
  TextColorDirective
} from '@coreui/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, NavComponent, NavItemComponent, NavLinkDirective, TabContentRefDirective, RouterLink, IconDirective, TabContentComponent, RoundedDirective, TabPaneComponent]
})
export class TabsComponent {

  public panes = [
    { name: 'Home 01', id: 'tab-01', icon: 'cilHome' },
    { name: 'Profile 02', id: 'tab-02', icon: 'cilUser' },
    { name: 'Contact 03', id: 'tab-03', icon: 'cilCode' }
  ];

  constructor() { }

}
