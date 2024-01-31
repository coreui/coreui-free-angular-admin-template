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
    return this.http.post<IUserInfo>(`${environment.apiUrl}users/login/admin`, userData);
  }


  forgetPassword(email: string): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}users/forget-password`, {email});
  }

  // fetchUserList()
  fetchUserList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}users`);
  }
}
