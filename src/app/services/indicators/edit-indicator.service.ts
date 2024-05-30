import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditIndicatorService {
  private apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: HttpClient) {}

  editIndicator(id: number, body: EditIndicatorBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}indicators/${id}`,body, {
      headers,
    });
  }
}
export interface EditIndicatorBody {
  name: string;
  index: number;
  description: string;
}
