import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  RowComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, DocsComponentsComponent]
})
export class ValidationComponent {

  readonly customStylesValidated = signal(false);
  readonly browserDefaultsValidated = signal(false);
  readonly tooltipValidated = signal(false);

  onSubmit1() {
    this.customStylesValidated.set(true);
    console.log('Submit... 1');
  }

  onReset1() {
    this.customStylesValidated.set(false);
    console.log('Reset... 1');
  }

  onSubmit2() {
    this.browserDefaultsValidated.set(true);
    console.log('Submit... 2');
  }

  onReset2() {
    this.browserDefaultsValidated.set(false);
    console.log('Reset... 2');
  }

  onSubmit3() {
    this.tooltipValidated.set(true);
    console.log('Submit... 3');
  }

  onReset3() {
    this.tooltipValidated.set(false);
    console.log('Reset... 3');
  }

}
