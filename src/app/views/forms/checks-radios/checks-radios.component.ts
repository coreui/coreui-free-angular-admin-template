import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormDirective,
  RowComponent
} from '@coreui/angular';
import { DocsComponentsComponent, DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  imports: [RowComponent, ReactiveFormsModule, FormDirective, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent, ButtonDirective, DocsComponentsComponent]
})
export class ChecksRadiosComponent {
  private formBuilder = inject(UntypedFormBuilder);

  inputDisabled: null = null;

  formGroup = this.formBuilder.group({
    flexRadioGroup: this.formBuilder.group({
      flexRadioDefault: this.formBuilder.control('two')
    }),
    flexRadioGroupDisabled: this.formBuilder.group({
      flexRadioDefault: this.formBuilder.control({ value: 'two', disabled: true })
    }),
    flexCheckGroup: this.formBuilder.group({
      checkOne: [false],
      checkTwo: [true]
    }),
    flexCheckGroupDisabled: this.formBuilder.group({
      checkThree: [{ value: false, disabled: true }],
      checkFour: [{ value: true, disabled: true }]
    }),
    btnCheckGroup: this.formBuilder.group({
      checkbox1: [true],
      checkbox2: [false],
      checkbox3: [{ value: false, disabled: true }]
    }),
    btnRadioGroup: this.formBuilder.group({
      radio1: this.formBuilder.control({ value: 'Radio2' })
    })
  });

  setCheckBoxValue(controlName: string) {
    const btnCheckGroup = this.formGroup.controls['btnCheckGroup'];
    const prevValue = btnCheckGroup.get(controlName)?.value;
    const groupValue = { ...btnCheckGroup.value };
    groupValue[controlName] = !prevValue;
    btnCheckGroup.patchValue(groupValue);
  }

  setRadioValue(value: string): void {
    const group = this.formGroup.controls['btnRadioGroup'];
    group.setValue({ radio1: value });
  }

}
