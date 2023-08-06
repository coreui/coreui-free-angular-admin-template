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
  ToastModule,
  CarouselModule,
  ImgModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AppToastComponent } from './components/toast-simple/toast.component';
import { ToastSampleIconComponent } from './components/toast-simple/toast-sample-icon.component';

/**
 * Module that collects all the coreui modules used by origo
 */
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
    ToastModule,
    ImgModule,
    CarouselModule
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
    ToastModule,
    ImgModule,
    CarouselModule
  ]
  
})
export class CoreUiDepsModule { }
