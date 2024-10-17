import { catchError, map } from 'rxjs';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface SignInResponse {
  code: number;
  content: {
    token: string;
    user: any;
  }
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = null;

  constructor(
      private apiService: ApiService,
      private router: Router
  ) {
    const _auth = JSON.parse(localStorage.getItem('auth') as string) as SignInResponse;
    this._user = _auth?.content?.user ?? null;

    this.check();
  }

  signIn(username: string, password: string) {
    return this.apiService.post<SignInResponse>('/login', {
      email: username,
      password
    }).pipe(map((response: SignInResponse) => {
      localStorage.setItem('auth', JSON.stringify(response));
      this._user = response.content.user;

      return true;
    }));
  }

  signOut(redirectUrl: string = '/login') {
    this.apiService.post('/logout').subscribe();
    localStorage.removeItem('auth');
    this._user = null;
    this.router.navigateByUrl(redirectUrl);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser() {
    return this._user;
  }

  check() {
    if (this.isLoggedIn()) {
      this.apiService.post('/check-auth').subscribe({
        next: () => {
          // do nothing
        },
        error: (e) => {
          this.signOut();
        }
      });
    }
  }
}
