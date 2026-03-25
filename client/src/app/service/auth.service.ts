import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import type { 
  AuthResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterRequest,
  SessionsResponse,
  TokenValidationResponse,
  UpdateUserInfoRequest,
  User
} from '@f123dashboard/shared';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { CookieService } from './cookie.service';
import { AUTH_CONSTANTS } from './auth.constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private apiService = inject(ApiService);
  private configService = inject(ConfigService);
  private cookieService = inject(CookieService);

  private currentUserSignal = signal<User | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);
  private tokenRefreshTimer: ReturnType<typeof setTimeout> | undefined;

  public currentUser = this.currentUserSignal.asReadonly();
  public isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor() {
    this.initializeAuth();
  }

  private getClientInfo(): { userAgent: string } {
    return {
      userAgent: navigator.userAgent
    };
  }

  private initializeAuth(): void {
    const token = this.getToken();
    const storedUser = sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
    
    if (storedUser === null) {
      return;
    }
    try {
      const user = JSON.parse(storedUser) as User;
      this.currentUserSignal.set(user);
      const hasEmail = !!(user.mail && user.mail.trim() !== '');
      this.isAuthenticatedSignal.set(hasEmail);
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }
    
    
    if (token) {
      this.validateTokenAndSetUser();
    }
  }

  private async validateTokenAndSetUser(): Promise<void> {
    try {
      const validation = await firstValueFrom(
        this.apiService.post<TokenValidationResponse>('/auth/validate', {})
      );
      if (validation.valid && validation.userId && validation.username && validation.name && validation.surname) {
        const userData: User = {
          id: validation.userId,
          username: validation.username,
          name: validation.name,
          surname: validation.surname,
          mail: validation.mail,
          image: validation.image,
          isAdmin: validation.isAdmin
        };
        
        this.setAuthenticatedUser(userData);
        this.scheduleTokenRefresh();
      } else {
        this.clearAuth();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      this.clearAuth();
    }
  }

  async login(loginData: LoginRequest, skipNavigation = false): Promise<AuthResponse> {
    try {
      const clientInfo = this.getClientInfo();
      loginData.userAgent = clientInfo.userAgent;
      const response = await firstValueFrom(
        this.apiService.post<AuthResponse>('/auth/login', loginData)
      );
      
      if (response.success && response.user && response.token) {
        this.setToken(response.token);
        this.scheduleTokenRefresh();
        if (response.user.mail && response.user.mail.trim() !== '') {
          this.setAuthenticatedUser(response.user);
        }
        
        if (!skipNavigation) {
          const returnUrl = response.user.isAdmin ? '/admin' : '/fanta';
          this.router.navigate([returnUrl]);
        }
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante il login. Riprova.'
      };
    }
  }

  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await firstValueFrom(
        this.apiService.post<AuthResponse>('/auth/register', registerData)
      );
      
      if (response.success && response.user && response.token) {
        this.setToken(response.token);
        this.setAuthenticatedUser(response.user);
        this.scheduleTokenRefresh();
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      }
      
      return response;
    } catch (error: unknown) {
      console.error('Registration error:', error);
      
      // Handle HTTP error responses
      if (error && typeof error === 'object' && 'error' in error) {
        const httpError = error as { error?: { message?: string } };
        if (httpError.error?.message) {
          return {
            success: false,
            message: httpError.error.message
          };
        }
      }
      
      return {
        success: false,
        message: 'Si è verificato un errore durante la registrazione. Riprova. Se l\'errore persiste, contatta il supporto.'
      };
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ChangePasswordResponse> {
    try {
      const token = this.getToken();
      if (!token) {
        return {
          success: false,
          message: 'Token di autenticazione non trovato'
        };
      }
      
      const changeData: ChangePasswordRequest = {
        currentPassword,
        newPassword,
        jwtToken: token
      };

      const response = await firstValueFrom(
        this.apiService.post<ChangePasswordResponse>('/auth/change-password', changeData)
      );
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Si è verificato un errore durante il cambio password. Riprova.'
      };
    }
  }

  async updateUserInfo(updateData: UpdateUserInfoRequest): Promise<AuthResponse> {
    try {

      const response = await firstValueFrom(
        this.apiService.post<AuthResponse>('/auth/update-user-info', updateData)
      );

      // Update the current user data in the service
      if (response.success && response.user) {
        this.setAuthenticatedUser(response.user);
      }
      
      return response;
    } catch (error: unknown) {
      console.error('Update user info error:', error);
      
      // Handle HTTP error responses
      if (error && typeof error === 'object' && 'error' in error) {
        const httpError = error as { error?: { message?: string } };
        if (httpError.error?.message) {
          return {
            success: false,
            message: httpError.error.message
          };
        }
      }
      
      return {
        success: false,
        message: 'Si è verificato un errore durante l\'aggiornamento delle informazioni utente. Riprova.'
      };
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const currentToken = this.getToken();
      if (!currentToken) {
        return false;
      }

      const clientInfo = this.getClientInfo();
      const response = await firstValueFrom(
        this.apiService.post<RefreshTokenResponse>('/auth/refresh-token', {
          token: currentToken,
          userAgent: clientInfo.userAgent
        })
      );
      
      if (response.success && response.token) {
        this.setToken(response.token);
        this.scheduleTokenRefresh();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      // Call backend to invalidate session
      if (token) {
        await firstValueFrom(
          this.apiService.post('/auth/logout', {})
        );
      }
    } catch (error) {
      console.warn('Backend logout error:', error);
    } finally {
      // Always clear local auth state
      this.clearAuth();
      // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 0);
    }
  }

  private setAuthenticatedUser(user: User): void {
    this.currentUserSignal.set(user);
    
    // Only set as authenticated if user has email
    const hasEmail = !!(user.mail && user.mail.trim() !== '');
    this.isAuthenticatedSignal.set(hasEmail);
    
    // Store user data in session storage for persistence
    sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER, JSON.stringify(user));
    sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN, hasEmail ? 'true' : 'false');
  }

  // Method to mark user as fully authenticated after email completion
  public markUserAsAuthenticated(): void {
    const currentUser = this.currentUserSignal();
    if (currentUser && currentUser.mail && currentUser.mail.trim() !== '') {
      this.isAuthenticatedSignal.set(true);
      sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN, 'true');
    }
  }

  private clearAuth(): void {
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    
    // Clear stored data
    this.cookieService.deleteCookie(AUTH_CONSTANTS.COOKIE_NAME, AUTH_CONSTANTS.COOKIE_PATH);
    sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
    sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.IS_LOGGED_IN);
    
    // Clear token refresh timer
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }
  }

  private setToken(token: string): void {
    this.cookieService.setCookie(AUTH_CONSTANTS.COOKIE_NAME, token, {
      maxAge: AUTH_CONSTANTS.COOKIE_MAX_AGE,
      path: AUTH_CONSTANTS.COOKIE_PATH,
      secure: true,
      sameSite: 'Strict'
    });
  }

  public getToken(): string | null {
    return this.cookieService.getCookie(AUTH_CONSTANTS.COOKIE_NAME);
  }

  private scheduleTokenRefresh(): void {
    // Clear existing timer
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }

    // Schedule refresh using configured time before expiry
    this.tokenRefreshTimer = setTimeout(() => {
      this.refreshToken().then(success => {
        if (!success) {
          this.logout();
        }
      });
    }, this.configService.tokenRefreshTimeBeforeExpiry);
  }

  // Session management methods
  async getUserSessions(): Promise<SessionsResponse> {
    try {
      const token = this.getToken();
      if (!token) {
        return { success: false, message: 'Token di autenticazione non trovato' };
      }

      const response = await firstValueFrom(
        this.apiService.get<SessionsResponse>('/auth/sessions')
      );
      return response;
    } catch (error) {
      console.error('Get user sessions error:', error);
      return { success: false, message: 'Si è verificato un errore durante il recupero delle sessioni' };
    }
  }

  async logoutAllSessions(): Promise<LogoutResponse> {
    try {
      const token = this.getToken();
      if (!token) {
        return { success: false, message: 'Token di autenticazione non trovato' };
      }

      const response = await firstValueFrom(
        this.apiService.post<LogoutResponse>('/auth/logout-all-sessions', {})
      );
      
      if (response.success) {
        // Clear local auth state since all sessions are logged out
        this.clearAuth();
        // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 0);
      }
      
      return response;
    } catch (error) {
      console.error('Logout all sessions error:', error);
      return { success: false, message: 'Si è verificato un errore durante il logout da tutte le sessioni' };
    }
  }


  // Helper method to validate password strength
  isPasswordStrong(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 8;
    const hasNumbers = /\d/.test(password);

    return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength;
  }
}
