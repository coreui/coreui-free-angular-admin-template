import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndicatorBody } from './types';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  getPaginatedIndicator(page: number, take: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(
      `${this.apiUrl}indicators?order=ASC&page=${page}&take=${take}`,
      {
        headers,
      }
    );
  }

  getIndicatorById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}indicators/${id}`, {
      headers,
    });
  }

  editIndicator(id: number, body: IndicatorBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}indicators/${id}`, body, {
      headers,
    });
  }

  deleteIndicator(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}indicators/${id}`, {
      headers,
    });
  }

  addIndicator(body: IndicatorBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}indicators`, body, {
      headers,
    });
  }
}
