import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  SpinnerModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ModalModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { AgGridAngular } from 'ag-grid-angular';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-withdraw-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  loadingWalletList: boolean;
  walletList: any[];
  rowData = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: any[] = [
    { headerName: 'Name', field: "full_name", filter: true},
    { headerName: 'Username', field: "username", filter: true },
    { headerName: 'Email', field: "email", filter: true },
    { headerName: 'Phone', field: "phone", filter: true },
    { headerName: 'Country', field: "country", filter: true },
    { headerName: 'Refer Code', field: "refer_code", filter: true },
    { headerName: 'Active', field: "active", filter: true }
  ];

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.fetchAllWallet();
  }

  fetchAllWallet(): void {
    // fetch all withdrawal list
    this.loadingWalletList = true;
    this.walletService.fetchAlUsers()
      .subscribe({
        next: (walletList: any[]) => {
          this.walletList = walletList;
          this.walletList.forEach(item => {
            this.rowData.push({
              "full_name": item.full_name,
              "username": item.username,
              "email": item.email,
              "phone": item.phone,
              "country": item.country,
              'refer_code': item.refer_code,
              'active': item.active === 1 ? 'Active' : 'Inactive'
            });
          });
        }
      });
  }
  
  getRounded(value: number): number {
    return Math.trunc(value * 10000) / 10000;
  }
}
