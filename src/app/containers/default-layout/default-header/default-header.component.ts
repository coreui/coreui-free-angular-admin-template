import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrigoSupplierUser } from '@core/model/OrigoSupplierUser';
import { AuthService } from '@core/services/auth.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, tap} from "rxjs";
import {IBreadcrumbItem} from "@coreui/angular/lib/breadcrumb/breadcrumb-item/breadcrumb-item";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  user: OrigoSupplierUser | undefined = undefined;
  breadcrumbsData: BreadCrumbData[] = []

  constructor(private classToggler: ClassToggleService, private readonly authService: AuthService, private cd: ChangeDetectorRef, private router: Router) {
    super();
    this.authService.userDomainSubscribe(user => {
      this.user = user;
      //this.cd.detectChanges()
    });

    // create breadcrumbs array
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => this.getUrlSegments((event as NavigationEnd).url)),
    ).subscribe(breadcrumbsData => {
      console.log(JSON.stringify(breadcrumbsData))
      this.breadcrumbsData = breadcrumbsData
    });
  }

  private getUrlSegments(url: string): BreadCrumbData[] {
    const segments = url.split('/').filter(segment => segment !== '');

    return segments.map((current, index) => {
      const link = segments.slice(0, index + 1).join('/')
      const active = index == segments.length - 1;
      return /*{label: current, url: link} as IBreadcrumbItem;*/new BreadCrumbData(link, current, active);
    });
  }
  get userPhotoUrl() {
    return !!this.user ? this.user.photoURL ?? '' : ''
  }
  
}

class BreadCrumbData {
  constructor(public link: string, public text: string, public active: boolean) {
  }

}