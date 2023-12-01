import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesModule } from '../modules.module';
import { AppModule } from 'src/app/app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, NavModule, TabsModule, GridModule, ProgressModule, ButtonModule, FormModule, ButtonGroupModule, AvatarModule, TableModule, WidgetModule, DropdownModule, SharedModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from '../../dashboard/dashboard-routing.module';

@Component({
  selector: 'app-staffdata',
  standalone: true,
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
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
  templateUrl: './staffdata.component.html',
  styleUrl: './staffdata.component.scss'
})
export class StaffdataComponent {

}
