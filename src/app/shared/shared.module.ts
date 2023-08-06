import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper'
import { CoreUiDepsModule } from '@coreui-deps/coreui-deps.module';


/**
 * Origo shared module: Contains all the shared components which unfortunately are not provided with coreui
 * For example the StepperComponent
 */
@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    CoreUiDepsModule
  ],
  exports: [
    StepperComponent,
    CdkStepperModule
  ]
})
export class SharedModule { }
