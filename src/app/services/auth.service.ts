import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, interval, of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  refreshTokenExpiresIn?: number;
  user?: User;
  // Handle different possible response formats
  [key: string]: any;
}

export interface User {
  id?: string;
  username?: string;
  email?: string;
  roles?: string[];
  firstname?: string;
  lastname?: string;
  profileimage?: string;
  // Handle different possible user field names
  name?: string;
  userName?: string;
  user_name?: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  profile_image?: string;
  peofileImage?: string;  // Handle typo in API response
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:44309/api/Account/login';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) {
    // Check if user is already logged in from encrypted localStorage
    this.initializeUserFromStorage();
  }



  private async initializeUserFromStorage(): Promise<void> {
    try {
      const token = localStorage.getItem('auth_token');
      const encryptedUser = localStorage.getItem('current_user');
      
      if (token && encryptedUser) {
        try {
          const user = await this.encryptionService.getEncryptedItem<User>('current_user');
          
          if (user) {
            this.currentUserSubject.next(user);
            // Start automatic token refresh if user is logged in
            this.startAutoTokenRefresh();
            return;
          } else {
            this.clearLocalStorage();
          }
        } catch (error) {
          console.error('Failed to decrypt user data:', error);
          this.clearLocalStorage();
        }
      }
    } catch (error) {
      console.error('Failed to initialize user from storage:', error);
      this.clearLocalStorage();
    }
  }

  private startAutoTokenRefresh(): void {
    // Check token every 5 minutes
    interval(5 * 60 * 1000).subscribe(() => {
      if (this.isAuthenticated() && this.isTokenExpiringSoon(10)) {
        this.refreshAccessToken().subscribe({
          next: () => {},
          error: (error) => {}
        });
      }
    });
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(this.API_URL, credentials, { headers })
      .pipe(
                tap(async response => {
          // Handle different token field names
          const token = response.token || response.accessToken;
          const refreshToken = response.refreshToken || '';
          const expiresIn = response.expiresIn || 3600; // Default to 1 hour
          const refreshTokenExpiresIn = response.refreshTokenExpiresIn || 604800; // Default to 7 days
          let user = response.user;
          
          // Use helper method to extract and format user
          user = this.extractUserFromResponse(response);
          
          if (token) {
            // Store token and user data
            localStorage.setItem('auth_token', token);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('expires_in', expiresIn.toString());
            localStorage.setItem('refresh_token_expires_in', refreshTokenExpiresIn.toString());
            
            // Calculate expiration times
            const tokenExpires = Date.now() + (expiresIn * 1000);
            const refreshTokenExpires = Date.now() + (refreshTokenExpiresIn * 1000);
            
            localStorage.setItem('token_expires', tokenExpires.toString());
            localStorage.setItem('refresh_token_expires', refreshTokenExpires.toString());
            
            // Store user data encrypted
            if (user) {
              try {
                await this.encryptionService.setEncryptedItem('current_user', user);
                this.currentUserSubject.next(user);
              } catch (error) {
                console.error('Encryption failed:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error('Failed to encrypt user data: ' + errorMessage);
              }
            }
            
            // Start automatic token refresh
            this.startAutoTokenRefresh();
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    // Call server-side logout API
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();
    
    if (token || refreshToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      // Include both tokens in logout request for better security
      const logoutRequest = {
        accessToken: token,
        refreshToken: refreshToken
      };

      // Call logout API and return the observable
      return this.http.post(`${this.API_URL.replace('/login', '/logout')}`, logoutRequest, { headers })
        .pipe(
          tap(() => {
            this.clearLocalStorage();
          }),
          catchError((error) => {
            // Still clear local storage even if server logout fails
            this.clearLocalStorage();
            // Return empty observable to continue the flow
            return of(null);
          })
        );
    } else {
      // No tokens available, just clear local storage
      this.clearLocalStorage();
      // Return empty observable
      return of(null);
    }
  }

  logoutWithRefreshToken(): void {
    // Alternative logout method using only refresh token
    const refreshToken = this.getRefreshToken();
    
    if (refreshToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const logoutRequest = {
        refreshToken: refreshToken
      };

      // Call logout API with refresh token
      this.http.post(`${this.API_URL.replace('/login', '/logout')}`, logoutRequest, { headers })
        .subscribe({
          next: () => {
            console.log('Server logout with refresh token successful');
            this.clearLocalStorage();
          },
          error: (error) => {
            console.error('Server logout with refresh token failed:', error);
            this.clearLocalStorage();
          }
        });
    } else {
      this.clearLocalStorage();
    }
  }

  public clearLocalStorage(): void {
    // Clear all stored data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    this.encryptionService.removeEncryptedItem('current_user');
    localStorage.removeItem('current_user'); // Also remove unencrypted version
    localStorage.removeItem('token_expires');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token_expires');
    localStorage.removeItem('refresh_token_expires_in');
    localStorage.removeItem('selectedRole');
    
    // Update current user
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const expires = localStorage.getItem('token_expires');
    
    if (!token || !expires) {
      return false;
    }

    // Check if token is expired
    const expirationTime = parseInt(expires);
    if (Date.now() > expirationTime) {
      // Token is expired, check if we can refresh
      if (this.isRefreshTokenValid()) {
        // Refresh token is still valid, don't logout yet
        // The interceptor will handle the refresh
        return true;
      } else {
        // Both tokens are expired, return false without calling logout
        // to avoid circular dependency
        return false;
      }
    }

    return true;
  }

  shouldAutoLogout(): boolean {
    // Check if both access token and refresh token are expired
    const tokenExpired = !this.getToken() || Date.now() > this.getTokenExpirationTime();
    const refreshTokenExpired = !this.isRefreshTokenValid();
    
    return tokenExpired && refreshTokenExpired;
  }

  getTokenStatus(): any {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();
    const tokenExpires = this.getTokenExpirationTime();
    const refreshTokenExpires = this.getRefreshTokenExpirationTime();
    const currentTime = Date.now();
    
    return {
      hasAccessToken: !!token,
      hasRefreshToken: !!refreshToken,
      accessTokenExpires: tokenExpires,
      refreshTokenExpires: refreshTokenExpires,
      accessTokenExpired: currentTime > tokenExpires,
      refreshTokenExpired: currentTime > refreshTokenExpires,
      accessTokenExpiresIn: Math.max(0, Math.floor((tokenExpires - currentTime) / 1000)),
      refreshTokenExpiresIn: Math.max(0, Math.floor((refreshTokenExpires - currentTime) / 1000)),
      canRefresh: this.isRefreshTokenValid(),
      shouldLogout: this.shouldAutoLogout()
    };
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getExpiresIn(): number {
    const expiresIn = localStorage.getItem('expires_in');
    return expiresIn ? parseInt(expiresIn) : 3600;
  }

  getRefreshTokenExpiresIn(): number {
    const refreshTokenExpiresIn = localStorage.getItem('refresh_token_expires_in');
    return refreshTokenExpiresIn ? parseInt(refreshTokenExpiresIn) : 604800;
  }

  getTokenExpirationTime(): number {
    const expires = localStorage.getItem('token_expires');
    return expires ? parseInt(expires) : 0;
  }

  getRefreshTokenExpirationTime(): number {
    const expires = localStorage.getItem('refresh_token_expires');
    return expires ? parseInt(expires) : 0;
  }

  isTokenExpiringSoon(minutes: number = 5): boolean {
    const expirationTime = this.getTokenExpirationTime();
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;
    const minutesUntilExpiry = timeUntilExpiry / (1000 * 60);
    
    return minutesUntilExpiry <= minutes;
  }

  isRefreshTokenValid(): boolean {
    const refreshToken = this.getRefreshToken();
    const expires = localStorage.getItem('refresh_token_expires');
    
    if (!refreshToken || !expires) {
      return false;
    }

    // Check if refresh token is expired
    const expirationTime = parseInt(expires);
    if (Date.now() > expirationTime) {
      return false;
    }

    return true;
  }

  refreshAccessToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken || !this.isRefreshTokenValid()) {
      return throwError(() => new Error('Invalid or expired refresh token'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const refreshRequest = {
      refreshToken: refreshToken
    };

    return this.http.post<LoginResponse>(`${this.API_URL.replace('/login', '/refresh')}`, refreshRequest, { headers })
      .pipe(
        tap(response => {
          console.log('Token refresh response:', response);
          
          const token = response.token || response.accessToken;
          const newRefreshToken = response.refreshToken || refreshToken;
          const expiresIn = response.expiresIn || 3600;
          const refreshTokenExpiresIn = response.refreshTokenExpiresIn || this.getRefreshTokenExpiresIn();
          
          if (token) {
            // Update stored tokens
            localStorage.setItem('auth_token', token);
            localStorage.setItem('refresh_token', newRefreshToken);
            localStorage.setItem('token_expires', (Date.now() + expiresIn * 1000).toString());
            localStorage.setItem('expires_in', expiresIn.toString());
            localStorage.setItem('refresh_token_expires', (Date.now() + refreshTokenExpiresIn * 1000).toString());
            localStorage.setItem('refresh_token_expires_in', refreshTokenExpiresIn.toString());
            
            console.log('Access token refreshed successfully');
            console.log('New token expires in:', expiresIn, 'seconds');
          } else {
            console.error('No token received in refresh response');
            this.logout(); // Force logout if refresh fails
          }
        }),
        catchError(error => {
          console.error('Token refresh failed:', error);
          this.logout(); // Force logout on refresh failure
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user && user.roles ? user.roles.includes(role) : false;
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Invalid username and password';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = 'Invalid username and password';
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid username and password';
          break;
        case 401:
          errorMessage = 'Invalid username and password';
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'Login service not found';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = 'Invalid username and password';
      }
    }
    
    console.error('AuthService error:', error);
    return throwError(() => new Error(errorMessage));
  }

  private extractUserFromResponse(response: LoginResponse): User | undefined {
    let user = response.user;
    
    // Handle different user field names in response
    if (!user && response['userName']) {
      user = { username: response['userName'] } as User;
    } else if (!user && response['name']) {
      user = { username: response['name'] } as User;
    } else if (!user && response['user_name']) {
      user = { username: response['user_name'] } as User;
    } else if (user && (user as any)['userName']) {
      // If user object exists but has userName instead of username
      user = { ...user, username: (user as any)['userName'] } as User;
    }
    
    // Handle additional user fields with different possible field names
    if (user) {
      const userObj = user as User;
      
      // Handle firstname/lastname fields
      if ((user as any)['firstName'] && !userObj.firstname) {
        userObj.firstname = (user as any)['firstName'];
      }
      if ((user as any)['lastName'] && !userObj.lastname) {
        userObj.lastname = (user as any)['lastName'];
      }
      if ((user as any)['first_name'] && !userObj.firstname) {
        userObj.firstname = (user as any)['first_name'];
      }
      if ((user as any)['last_name'] && !userObj.lastname) {
        userObj.lastname = (user as any)['last_name'];
      }
      
      // Handle profile image fields
      if ((user as any)['profileImage'] && !userObj.profileimage) {
        userObj.profileimage = (user as any)['profileImage'];
      }
      if ((user as any)['profile_image'] && !userObj.profileimage) {
        userObj.profileimage = (user as any)['profile_image'];
      }
      if ((user as any)['profileImg'] && !userObj.profileimage) {
        userObj.profileimage = (user as any)['profileImg'];
      }
      if ((user as any)['avatar'] && !userObj.profileimage) {
        userObj.profileimage = (user as any)['avatar'];
      }
      if ((user as any)['peofileImage'] && !userObj.profileimage) {
        userObj.profileimage = (user as any)['peofileImage'];
      }
      
      user = userObj;
    }
    
    // Also check response level for these fields
    if (!user) {
      user = {} as User;
    }
    
    const userObj = user as User;
    
    // Handle response level fields for the specific API format
    if (response['userName'] && !userObj.username) {
      userObj.username = response['userName'];
    }
    if (response['firstName'] && !userObj.firstname) {
      userObj.firstname = response['firstName'];
    }
    if (response['lastName'] && !userObj.lastname) {
      userObj.lastname = response['lastName'];
    }
    if (response['peofileImage'] && !userObj.profileimage) {
      userObj.profileimage = response['peofileImage'];
    }
    
    // Also check for correct spelling variations
    if (response['profileImage'] && !userObj.profileimage) {
      userObj.profileimage = response['profileImage'];
    }
    if (response['profile_image'] && !userObj.profileimage) {
      userObj.profileimage = response['profile_image'];
    }
    if (response['profileImg'] && !userObj.profileimage) {
      userObj.profileimage = response['profileImg'];
    }
    if (response['avatar'] && !userObj.profileimage) {
      userObj.profileimage = response['avatar'];
    }
    
    // Handle roles from response level (new format)
    if (response['roles'] && Array.isArray(response['roles'])) {
      userObj.roles = response['roles'];
    }
    
    return userObj;
  }
} 