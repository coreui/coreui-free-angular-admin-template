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
    const headers = new HttpHeaders()
      .set('Bypass-Tunnel-Reminder', 'anything');
    return this.http.get<IWithdraw[]>(`${environment.apiUrl}wallet/withdrawal-list`, { headers: headers });
  }

  approveWithdrawById(withdrawalId: number): Observable<{latestWithdrawList: IWithdraw[]} & {payoutStatus: IPayout}> {
    const headers = new HttpHeaders()
      .set('Bypass-Tunnel-Reminder', 'anything');
    return this.http.post<{latestWithdrawList: IWithdraw[]} & {payoutStatus: IPayout}>(`${environment.apiUrl}wallet/withdraw/approve`, {withdrawalId},{ headers: headers });
  }

  rejectWithdrawById(withdrawalId: number, message: string): Observable<IWithdraw[]> {
    const headers = new HttpHeaders()
      .set('Bypass-Tunnel-Reminder', 'anything');
    return this.http.post<IWithdraw[]>(`${environment.apiUrl}wallet/withdraw/reject`, {withdrawalId, message},{ headers: headers });
  }
}
