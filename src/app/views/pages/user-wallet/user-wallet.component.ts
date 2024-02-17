import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { AgGridAngular } from 'ag-grid-angular';
import { WalletService } from 'src/app/services/wallet/wallet.service';

@Component({
  selector: 'app-user-wallet',
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
  templateUrl: './user-wallet.component.html',
  styleUrl: './user-wallet.component.scss'
})
export class UserWalletComponent {
  loadingWalletList: boolean;
  walletList: any[];
  rowData = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: any[] = [
    { headerName: 'User', field: "user", filter: true},
    { headerName: 'Username', field: "username", filter: true },
    { headerName: 'Investment', field: "investment", filter: true },
    { headerName: 'Profit', field: "profit", filter: true },
    { headerName: 'Net Wallet', field: "net_wallet", filter: true },
    { headerName: 'Total Withdrawal', field: "total_withdrawal", filter: true }
  ];

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.fetchAllWallet();
  }

  fetchAllWallet(): void {
    // fetch all withdrawal list
    this.loadingWalletList = true;
    this.walletService.fetchAllWallet()
      .subscribe({
        next: (walletList: any[]) => {
          this.walletList = walletList;
          this.walletList.forEach(item => {
            this.rowData.push({
              "user": item.full_name,
              "username": item.username,
              "investment": item.invest_wallet,
              "profit": item.roi_wallet,
              "net_wallet": item.net_wallet,
              'total_withdrawal': item.total_withdrawal > 0 ? this.getRounded(item.total_withdrawal) : 0
            });
          });
        }
      });
  }

  getRounded(value: number): number {
    return Math.trunc(value * 10000) / 10000;
  }
}
