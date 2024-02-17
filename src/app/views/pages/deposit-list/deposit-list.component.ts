import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { AgGridAngular } from 'ag-grid-angular';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { DatePipe } from '@angular/common';

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
    FormsModule,
    AgGridAngular
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deposit-list.component.html',
  styleUrl: './deposit-list.component.scss',
  providers: [DatePipe]
})
export class DepositListComponent {
  loadingWalletList: boolean;
  walletList: any[];
  rowData = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: any[] = [
    { headerName: 'User', field: "username", filter: true},
    { headerName: 'Amount', field: "amount", filter: true },
    { headerName: 'Deposit Address', field: "send_to", filter: true },
    { headerName: 'Send From', field: "send_from", filter: true },
    { headerName: 'Date', field: "modified_on", filter: true }
  ];

  constructor(
              private walletService: WalletService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchAllWallet();
  }

  fetchAllWallet(): void {
    // fetch all withdrawal list
    this.loadingWalletList = true;
    this.walletService.fetchAllDeposit()
      .subscribe({
        next: (walletList: any[]) => {
          this.walletList = walletList;
          this.walletList.forEach(item => {
            this.rowData.push({
              "username": item.username,
              "amount": item.amount,
              "send_to": item.send_to,
              "send_from": item.send_from,
              "modified_on": this.datePipe.transform(item.modified_on, 'MM-dd-YYYY HH:mm:ss')
            });
          });
        }
      });
  }

  getRounded(value: number): number {
    return Math.trunc(value * 10000) / 10000;
  }
}
