import { environment } from './../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  basePath: string = environment.api.path;

  constructor(private http: HttpClient) { }

  get<T>(path: string, params?: any) : Observable<T> {
    return this.http.get<T>(`${this.basePath}${path}`, {
      params: params
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  post<T>(path: string, body?: any) : Observable<T> {
    return this.http.post<T>(`${this.basePath}${path}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  put<T>(path: string, body?: any) : Observable<T> {
    return this.http.put<T>(`${this.basePath}${path}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  patch<T>(path: string, body?: any) : Observable<T> {
    return this.http.patch<T>(`${this.basePath}${path}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete<T>(path: string, params?: any) : Observable<T> {
    return this.http.delete<T>(`${this.basePath}${path}`, {
        params: params
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
