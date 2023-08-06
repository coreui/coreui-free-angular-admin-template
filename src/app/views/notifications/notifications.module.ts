import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { ComponentsModule } from '../../../components/components.module';
import { NotificationsRoutingModule } from './notifications-routing.module';

import { AlertsComponent } from './alerts/alerts.component';
import { BadgesComponent } from './badges/badges.component';
import { ModalsComponent } from './modals/modals.component';
import { ToastersComponent } from './toasters/toasters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BadgesComponent,
    AlertsComponent,
    ModalsComponent,
    ToastersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationsRoutingModule,
    ComponentsModule,
    AlertModule,
    GridModule,
    CardModule,
    BadgeModule,
    ButtonModule,
    FormModule,
    ModalModule,
    ToastModule,
    SharedModule,
    UtilitiesModule,
    TooltipModule,
    PopoverModule,
    ProgressModule
  ],
})
export class NotificationsModule {
}
