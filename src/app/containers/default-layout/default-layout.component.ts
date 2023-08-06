import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { navItems } from './_nav';
import { ToastComponent, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { ActionResult, Result, UserActionNotificationService } from '@core/services/user-action-notification.service';
import { AppToastComponent } from '@coreui-deps/components/toast-simple/toast.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements AfterViewInit {

  public navItems = navItems;

  // Backend notifications via toaster
  @ViewChild(ToasterComponent) toaster!: ToasterComponent

  colorActionStateMap = new Map<Result, string>([
    [Result.ERROR, 'danger'],
    [Result.SUCCESS, 'success'],
  ]);


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private readonly userActionsNotifSvc: UserActionNotificationService) {}

  addToast(result: ActionResult) {
    const toastProps = {
      title: result.title ?? 'Hey...',
      delay: 5000,
      placement: ToasterPlacement.TopEnd,
      color: this.colorActionStateMap.get(result.result),
      autohide: true,
      message: result.message
    }

    this.toaster.addToast(AppToastComponent, {...toastProps}, {});
  }
 
   
  ngAfterViewInit(): void {
    this.userActionsNotifSvc.subscribe(notification => {
      this.addToast(notification);
    })
  }
}
