import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUserData, IUserInfo, IUserLoginData, IWallet} from "./user/user.type";
import { JWTTokenService } from './auth/jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  userData$: BehaviorSubject<IUserData> = new BehaviorSubject<IUserData>({} as IUserData);
  userWallet$: BehaviorSubject<IWallet> = new BehaviorSubject<IWallet>({} as IWallet);
  userToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showNotification$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  bearerToken: string = '';

  constructor(
    private router: Router,
    private jwtService: JWTTokenService
  ) {
  }

  get userData(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.bearerToken = localStorage.getItem('bearer')!;
      if (this.bearerToken !== '') {
        resolve(this.bearerToken);
      }
      reject(false);
    });
  }

  get userRole() {
    return this.jwtService.getDecodedAccessToken(this.bearerToken).role;
  }

  get userTokenDetail() {
    return this.jwtService.getDecodedAccessToken(this.bearerToken);
  }

  set viewNotifications(state: boolean) {
    this.showNotification$.next(state);
  }

  set wallet(wallet: IWallet) {
    this.userWallet$.next(wallet);
  }

  set setUserInfo(userInfo: IUserInfo) {
    this.userToken$.next(userInfo.token.accessToken);
    this.userData$.next(userInfo.user)
    this.userWallet$.next(userInfo.wallet);
  }

  ifLoggedIn() {
    const userToken: string = localStorage.getItem('bearer')!;
    this.jwtService.setToken(userToken);
    if (!this.jwtService.isTokenExpired()) {
      this.authState.next(true);
    }
  }

  isLoggedIn(): boolean {
    const userToken: string = localStorage.getItem('bearer')!;
    this.jwtService.setToken(userToken);
    if (!this.jwtService.isTokenExpired()) {
      return true;
    }

    return false;
  }

  setUserData(bearer: string) {
    localStorage.setItem('bearer', bearer);
    this.router.navigateByUrl('#/dashboard', { skipLocationChange: true });
    this.authState.next(true);
  }

  logout() {
    localStorage.removeItem('bearer');
    this.authState.next(false);
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  getToken(): string {
    return localStorage.getItem('bearer')!;
  }
}
