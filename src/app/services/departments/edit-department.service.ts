import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditDepartmentService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  patchDepartment(id: number, body: EditDepartmentBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}/dptos/${id}`, body, {
      headers,
    });
  }
}

export interface EditDepartmentBody {
  name: string;
}
