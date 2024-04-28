import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IDepositAddress, IPayout, IUserData, IWallet, IWalletAddress, IWithdraw} from "../user/user.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  fetchAllWithdraw(): Observable<IWithdraw[]> {
    return this.http.get<IWithdraw[]>(`${environment.apiUrl}wallet/withdrawal-list`);
  }

  // Approved withdrawal list
  fetchAllApprovedWithdrawal(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}wallet/report/view_approved_withdrawal_list/all`);
  }

  approveWithdrawById(withdrawalId: number): Observable<{latestWithdrawList: IWithdraw[]} & {payoutStatus: IPayout}> {
    return this.http.post<{latestWithdrawList: IWithdraw[]} & {payoutStatus: IPayout}>(`${environment.apiUrl}wallet/withdraw/approve`, {withdrawalId});
  }

  rejectWithdrawById(withdrawalId: number, message: string): Observable<IWithdraw[]> {
    return this.http.post<IWithdraw[]>(`${environment.apiUrl}wallet/withdraw/reject`, {withdrawalId, message});
  }

  // user list
  fetchAlUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}wallet/report/view_user_list/all`);
  }
  
  // wallet list
  fetchAllWallet(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}wallet/report/view_user_wallet/all`);
  }
  
  // deposit list
  fetchAllDeposit(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}wallet/report/view_deposit_list/all`);
  }
  
  // deposit list
  fetchAllPurchase(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}wallet/report/view_purchased_amount/all`);
  }
  
  // deposit list
  fetchGroupSale(userId: number, dateFrom: string, dateTo: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}wallet/group-sale/${userId}/${dateFrom}/${dateTo}`);
  }
}
