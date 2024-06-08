import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDepartmentBody, EditDepartmentBody } from './types';
@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  postDepartment(body: CreateDepartmentBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/dptos`, body, {
      headers,
    });
  }

  deleteDepartment(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/dptos/${id}`, {
      headers,
    });
  }

  patchDepartment(id: number, body: EditDepartmentBody): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}/dptos/${id}`, body, {
      headers,
    });
  }

  getDepartmentById(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/dptos/${id}`, {
      headers,
    });
  }

  getPaginatedDepartments(page: number, take: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(
      `${this.apiUrl}/dptos?order=ASC&page=${page}&take=${take}`,
      {
        headers,
      }
    );
  }
}
