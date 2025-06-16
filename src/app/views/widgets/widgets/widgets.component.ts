import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { WidgetsBrandComponent } from '../widgets-brand/widgets-brand.component';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsEComponent } from '../widgets-e/widgets-e.component';
import { WidgetsDropdownComponent } from '../widgets-dropdown/widgets-dropdown.component';
import { DocsExampleComponent } from '@docs-components/public-api';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, RowComponent, ColComponent, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, WidgetStatFComponent, TemplateIdDirective, CardGroupComponent, WidgetStatCComponent } from '@coreui/angular';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, WidgetsDropdownComponent, RowComponent, ColComponent, WidgetStatBComponent, ProgressBarDirective, ProgressComponent, WidgetsEComponent, WidgetStatFComponent, TemplateIdDirective, IconDirective, WidgetsBrandComponent, CardGroupComponent, WidgetStatCComponent]
})
export class WidgetsComponent implements AfterContentInit {
  private changeDetectorRef = inject(ChangeDetectorRef);


  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
