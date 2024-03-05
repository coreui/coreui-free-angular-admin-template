import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';

import { ToastComponent, ToasterService, ToastHeaderComponent, ToastBodyComponent, ToastCloseDirective, ProgressBarDirective, ProgressComponent } from '@coreui/angular';

@Component({
    selector: 'app-toast-simple',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    providers: [{ provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent) }],
    standalone: true,
    imports: [ToastHeaderComponent, ToastBodyComponent, ToastCloseDirective, ProgressBarDirective, ProgressComponent]
})
export class AppToastComponent extends ToastComponent {

  @Input() closeButton = true;
  @Input() title = '';

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }
}
