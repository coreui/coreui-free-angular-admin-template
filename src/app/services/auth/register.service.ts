import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  postRegister(body: RegisterBody): Observable<any> {
    if (body.password !== body.confirmPassword)
      throw new Error('La contraseñas deben ser iguales');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/auth/register`, body, {
      headers,
    });
  }
}

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  birthdate: string;
}
