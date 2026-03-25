import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  get apiBaseUrl(): string {
    return environment.apiBaseUrl;
  }

  get isProduction(): boolean {
    return environment.production;
  }

  get tokenRefreshTimeBeforeExpiry(): number {
    return 6 * 24 * 60 * 60 * 1000; // 6 days in milliseconds
  }
}
