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
import { CardsRoutingModule } from './cards-routing.module';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { PcCardComponent } from './pc-card/pc-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  imports: [
    CardsRoutingModule,
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
    BudgetCardComponent,
    PcCardComponent,
    ProfileCardComponent
   ],
  declarations: []
})
export class CardsModule {
}
