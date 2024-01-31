import { Component } from '@angular/core';

import { navItemsAll, navItemsWithdrawal, navItemsMember } from './_nav';
import { INavData } from '@coreui/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems: INavData[] = null;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    switch (this.auth.userRole) {
      case 1: this.navItems = navItemsAll;
        break;
      
      case 2: this.navItems = navItemsAll;
        break;
      
      case 3: this.navItems = navItemsAll;
        break;
      
      case 4: this.navItems = navItemsMember;
        break;

      case 5: this.navItems = navItemsWithdrawal;
        break;
    }
  }
}
