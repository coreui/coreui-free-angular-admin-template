import { Component, forwardRef, Input } from '@angular/core';

import { ProgressComponent, ToastBodyComponent, ToastCloseDirective, ToastComponent, ToastHeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-toast-simple',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent) }],
  imports: [ToastHeaderComponent, ToastBodyComponent, ToastCloseDirective, ProgressComponent]
})
export class AppToastComponent extends ToastComponent {

  constructor() {
    super();
  }

  @Input() closeButton = true;
  @Input() title = '';
}
