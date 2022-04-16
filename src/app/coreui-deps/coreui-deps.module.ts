import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  SharedModule,
  ToastModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NotificationsModule } from '../views/notifications/notifications.module';
import { AppToastComponent } from './components/toast-simple/toast.component';
import { ToastSampleIconComponent } from './components/toast-simple/toast-sample-icon.component';


@NgModule({
  declarations: [AppToastComponent, ToastSampleIconComponent],
  imports: [
    CommonModule,
    FooterModule,
    DropdownModule,
    GridModule,
    IconModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    CardModule,
    BreadcrumbModule,
    HeaderModule,
    AvatarModule,
    NavModule,
    AlertModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    CardModule,
    GridModule,
    AlertModule,
    ToastModule
  ]
  
})
export class CoreUiDepsModule { }
