import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-deposit-list',
  standalone: true,
  imports: [
    CommonModule,
    IconModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule,
    ChartjsModule,
    TabsModule,
    ModalModule,
    SpinnerModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deposit-list.component.html',
  styleUrl: './deposit-list.component.scss'
})
export class DepositListComponent {

}
