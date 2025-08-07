import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// API Response Interfaces
export interface CountryApiResponse {
  countryId: number;
  countryName: string;
  countryShortName: string | null;
  countryCode: string;
  isActive: boolean;
  updateBy: string;
  updateDate: string;
  displayOrder: number;
  states: any[];
  updateByNavigation: any;
}

export interface StateApiResponse {
  stateId: number;
  stateName: string;
  stateShortName: string | null;
  stateCode: string;
  countryId: number;
  countryName: string;
  isActive: boolean;
  updateBy: string;
  updateDate: string;
  displayOrder: number;
  country: any;
  updateByNavigation: any;
}

export interface CityApiResponse {
  cityId: number;
  cityName: string;
  cityShortName: string | null;
  stateId: number;
  isActive: boolean;
  updateBy: string;
  updateDate: string;
  displayOrder: number;
  state: any;
  updateByNavigation: any;
}

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  private readonly API_BASE_URL = 'https://localhost:44309/api/masters';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCountries(): Observable<CountryApiResponse[]> {
    return this.http.get<CountryApiResponse[]>(`${this.API_BASE_URL}/CountryMaster`, {
      headers: this.getHeaders()
    });
  }

  getStates(): Observable<StateApiResponse[]> {
    return this.http.get<StateApiResponse[]>(`${this.API_BASE_URL}/StateMaster`, {
      headers: this.getHeaders()
    });
  }

  getCities(): Observable<CityApiResponse[]> {
    return this.http.get<CityApiResponse[]>(`${this.API_BASE_URL}/CityMaster`, {
      headers: this.getHeaders()
    });
  }
} 