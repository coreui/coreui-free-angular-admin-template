import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  patchCriterion(id: number, body: EditCriterionBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}/criteria/${id}`, body, {
      headers,
    });
  }
}

export interface EditCriterionBody {
  name: string;
  index: number;
  description: string;
  indicatorID: number;
}
