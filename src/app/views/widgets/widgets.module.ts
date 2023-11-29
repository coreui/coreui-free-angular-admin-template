import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from './widgets-e/widgets-e.component';

@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ProgressModule,
    ChartjsModule
  ],
  exports: [
    WidgetsDropdownComponent
  ]
})
export class WidgetsModule {
}
