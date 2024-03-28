import { Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, FormDirective, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-checks-radios',
    templateUrl: './checks-radios.component.html',
    styleUrls: ['./checks-radios.component.scss'],
    standalone: true,
    imports: [RowComponent, ReactiveFormsModule, FormDirective, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent, ButtonDirective]
})
export class ChecksRadiosComponent {

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
      checkbox3: [{value: false, disabled: true}]
    }),
    btnRadioGroup: this.formBuilder.group({
      radio1: this.formBuilder.control({ value: 'Radio2' })
    })
  });


  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

  setCheckBoxValue(controlName: string) {
    const btnCheckGroup = this.formGroup.controls['btnCheckGroup'];
    const prevValue = btnCheckGroup.get(controlName)?.value;
    const groupValue = {...btnCheckGroup.value};
    groupValue[controlName] = !prevValue;
    btnCheckGroup.patchValue(groupValue);
  }

  setRadioValue(value: string): void {
    const group = this.formGroup.controls['btnRadioGroup'];
    group.setValue({ radio1: value });
  }

}
