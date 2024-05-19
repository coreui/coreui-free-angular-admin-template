import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  postLogin(body: LoginBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(body);
    console.log('hola');
    return this.http.post(`${this.apiUrl}/auth/login`, body, {
      headers,
    });
  }
}

interface LoginBody {
  email: string;
  password: string;
}
