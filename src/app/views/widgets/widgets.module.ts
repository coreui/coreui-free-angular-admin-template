import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  ChartModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ComponentsModule } from '../../../components/components.module';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';

@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    ChartModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ComponentsModule,
    ProgressModule
  ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent
  ]
})
export class WidgetsModule {
}
