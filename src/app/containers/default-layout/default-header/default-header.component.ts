import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public userPhotoUrl : string | undefined = undefined;

  constructor(private classToggler: ClassToggleService, private readonly authService: AuthService) {
    super();
    authService.userDomainSubscribe(user => {this.userPhotoUrl = user.photoURL});
  }
}
