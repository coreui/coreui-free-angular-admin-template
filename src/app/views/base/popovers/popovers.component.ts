import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, PopoverDirective, RowComponent } from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ButtonDirective, PopoverDirective, DocsComponentsComponent]
})
export class PopoversComponent implements OnInit {

  readonly visible = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.visible.update(visible => !visible);
    }, 3000);
  }

}
