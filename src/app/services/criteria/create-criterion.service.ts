import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  postCriterion(body: CreateCriterionBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/criteria`, body, {
      headers,
    });
  }
}

export interface CreateCriterionBody {
  name: string;
  index: number;
  description: string;
  indicatorID: number;
}
