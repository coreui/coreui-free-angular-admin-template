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
  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.fetchWithdrawal();
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
    console.log('um here', this.showRejectModal);
    this.selectedWithdrawal = item;
    this.showRejectModal = true;
  }
}
