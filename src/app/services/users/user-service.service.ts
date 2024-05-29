import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserServiceService {

  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  postUsers(body: addUserBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/users`, body, {
      headers,
    });
  }
}

export interface addUserBody {
  name: string;
  email: string;
  department: {
    name: string;
    id: number;
  };
  rol: string;
}
