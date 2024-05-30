import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  createUser(body: CreateUserBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}users`,body, {
      headers,
    });
  }
}

export interface CreateUserBody {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  departmentId: number;
  role: string;
} 