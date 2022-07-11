import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})
export class ListGroupsComponent {

  breakpoints = [true, 'sm', 'md', 'lg', 'xl', 'xxl'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  checkBoxes = this.formBuilder.group({
    one: false,
    two: false,
    three: true,
    four: true,
    five: {value: false, disabled: true}
  });

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

  setValue(controlName: string) {
    const prevValue = this.checkBoxes.get(controlName)?.value;
    const value = this.checkBoxes.getRawValue();
    value[controlName] = !prevValue;
    this.checkBoxes.setValue(value);
  }

  logValue() {
    console.log(this.checkBoxes.value);
    this.checkBoxes.reset();
  }

  getValue(controlName: string) {
    return this.checkBoxes.get(controlName);
  }
}
