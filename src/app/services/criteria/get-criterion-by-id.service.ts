import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCriterionByIdService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getCriterionById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/criteria/${id}`, {
      headers,
    });
  }
}
