import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';

import { ToastComponent, ToasterService } from '@coreui/angular';

/**
 * This component extends the coreui ToastComponent in order to provide a toast which support also a body message
 * and that can be dynamically added to a <c-toaster> component. See https://coreui.io/angular/docs/components/toast
 */
@Component({
  selector: 'app-toast-simple',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent) }]
})
export class AppToastComponent extends ToastComponent {

  @Input() closeButton = true;
  @Input() title = '';
  message: string = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
    toasterService.toasterState$.subscribe(state => {
      this.message = (state.toast ?? {} as any)['message'] ?? '';
    })
  }
}