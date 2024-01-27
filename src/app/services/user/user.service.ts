import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserInfo, IUserLoginData } from './user.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  loginUser(userData: IUserLoginData): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(`${environment.apiUrl}users/login`, userData);
  }


  forgetPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}users/forget-password`, {email});
  }
}
