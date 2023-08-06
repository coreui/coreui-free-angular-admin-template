import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper implements OnInit {

  @Input()
  config: StepperConfig = new StepperConfig;

  @Input()
  stepControls: FormGroup[] = [];

  ngOnInit(): void {
  }

  isNextButtonHidden() {
    return !(this.steps.length === this.selectedIndex + 1);
  }

  onNext() {
    this.stepControls[this.selectedIndex].markAllAsTouched();
    this.stepControls[this.selectedIndex].updateValueAndValidity();
  }

  onResetCurrentStep() {
    this.stepControls[this.selectedIndex].reset();
    this.stepControls[this.selectedIndex].markAsPristine();
  }
    
  get isFormValid(): boolean {
    return !!this.stepControls.find(cntl => cntl.valid === false)
  }
}

export class StepperConfig {
  public constructor(public disableSubmitWhenInvalid: boolean = true) {}
}
