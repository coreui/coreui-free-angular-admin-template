import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModulesRoutingModule } from './modules-routing.module';
import { StaffdataComponent } from './staffdata/staffdata.component';
import { ProfileComponent } from './profile/profile.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { BudgetComponent } from './budget/budget.component';
import { PcComponent } from './pc/pc.component';
import { ImdComponent } from './imd/imd.component';
import { VlaComponent } from './vla/vla.component';

@NgModule({
  imports: [
    ModulesRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    NgbModule,
    CommonModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ProgressModule,
    ChartjsModule,
    StaffdataComponent,
    ProfileComponent,
    ComplaintsComponent,
    BudgetComponent,
    PcComponent,
    ImdComponent,
    VlaComponent
  ],
  declarations: []
})
export class ModulesModule {
}
