import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { AuthService } from '../../services/auth.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    NgScrollbar,
    RouterOutlet,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];
  decodeToken:any;decodedTxt:any;
  isItemFound = true;
  matchedItem:any;
  constructor(private authService:AuthService){}

  ngOnInit() {
     this.navItems.filter(item => {
        // console.log(item.children)

        this.decodeToken = this.authService.getDecodeToken();
        this.decodedTxt = JSON.parse(this.decodeToken);
        if (!this.decodedTxt?.isAdmin) {

          console.log("No Name")
          this.matchedItem = item.children?.filter(item => item.name === 'Add Product');
          console.log(this.matchedItem);
         // this.isItemFound = !!match;
          //return this.isItemFound;
        }
     })
  }

}
