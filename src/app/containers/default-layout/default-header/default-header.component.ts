import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrigoSupplierUser } from '@core/model/OrigoSupplierUser';
import { AuthService } from '@core/services/auth.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

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

  constructor(private classToggler: ClassToggleService, private readonly authService: AuthService, private cd: ChangeDetectorRef) {
    super();
    this.authService.userDomainSubscribe(user => {
      this.user = user;
      //this.cd.detectChanges()
    });
  }


  get userPhotoUrl() {
    return !!this.user ? this.user.photoURL ?? '' : ''
  }
  
}
