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
import { WidgetsModule } from '../../widgets/widgets.module';
import { WalletService } from '../../../services/wallet/wallet.service';
import { IPayout, IWithdraw } from 'src/app/services/user/user.type';
import { ModalModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './withdraw-list.component.html',
  styleUrl: './withdraw-list.component.scss',
})
export class WithdrawListComponent {
  @ViewChild('approveConfirmation') approveConfirmationModal!: ElementRef;
  withdrawalList: IWithdraw[] = [];
  selectedWithdrawal: IWithdraw = this.withdrawalList[0];
  rejectMessage: string = '';

  showApproveModal: boolean = false;
  showRejectModal: boolean = false;
  loadingWithdrawal: boolean = false;
  approveLoading: boolean = false;
  rejectLoading: boolean = false;
  isApproval: boolean = false;
  userRole: number = null;

  constructor(private walletService: WalletService,
    private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.fetchWithdrawal();
    this.isApproval = (this.auth.userRole === 2 || this.auth.userRole === 5);
  }

  fetchWithdrawal(): void {
    // fetch all withdrawal list
    this.loadingWithdrawal = true;
    this.walletService.fetchAllWithdraw()
      .subscribe({
        next: (withdrawalList: IWithdraw[]) => {
          this.withdrawalList = withdrawalList;
        }
      });
  }

  approve(id: number): void {
    if (id) {
      this.approveLoading = true;
      this.walletService.approveWithdrawById(id)
        .subscribe({
          next: (response: {latestWithdrawList: IWithdraw[]} & {payoutStatus: IPayout}) => {
            this.withdrawalList = response.latestWithdrawList;
            this.approveLoading = false;
            this.showApproveModal = false;
          },
          error: (e) => {
            console.log(e);
          }
        });
    } else {
      this.showApproveModal = false;
    }
  }

  reject(id: number): void {
    if (id) {
      this.rejectLoading = true;
      this.walletService.rejectWithdrawById(id, this.rejectMessage)
        .subscribe({
          next: (withdrawalList: IWithdraw[]) => {
            this.withdrawalList = withdrawalList;
            this.rejectLoading = false;
            this.showRejectModal = false;
            this.rejectMessage = '';
          }
        });
    } else {
      this.showRejectModal = false;
    }
  }

  getRounded(value: number): number {
    return Math.trunc(value * 10000) / 10000;
  }

  showApproveConfirmation(item: IWithdraw): void {
    this.selectedWithdrawal = item;
    this.showApproveModal = true;
  }

  showRejectConfirmation(item: IWithdraw): void {
    this.selectedWithdrawal = item;
    this.showRejectModal = true;
  }
}