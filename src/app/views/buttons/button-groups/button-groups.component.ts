import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-groups',
  templateUrl: './button-groups.component.html',
  styleUrls: ['./button-groups.component.scss']
})
export class ButtonGroupsComponent {

  formCheck1 = this.formBuilder.group({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false
  });
  formRadio1 = new FormGroup({
    radio1: new FormControl('Radio1')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  setCheckBoxValue(controlName: string) {
    const prevValue = this.formCheck1.get(controlName)?.value;
    const value = this.formCheck1.value;
    value[controlName] = !prevValue;
    this.formCheck1.setValue(value);
  }

  setRadioValue(value: string): void {
    this.formRadio1.setValue({ radio1: value });
  }
}
