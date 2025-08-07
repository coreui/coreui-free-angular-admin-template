import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Subscription, timer } from 'rxjs';

// CoreUI Components
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  AlertComponent
} from '@coreui/angular';

// Services
import { AuthService, LoginRequest } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    // Angular Modules
    NgStyle,
    NgIf,
    ReactiveFormsModule,
    
    // CoreUI Components
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    AlertComponent
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  // Form properties
  loginForm!: FormGroup;
  
  // UI state properties
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  
  // Timer for auto-hiding error messages
  private errorTimer?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Check for logout message in query parameters
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.successMessage = params['message'];
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    });
    
    // Check for logout message in router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['message']) {
      this.successMessage = navigation.extras.state['message'];
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    }
  }

  /**
   * Initialize the login form with validation
   */
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.performLogin();
    }
  }

  /**
   * Perform the login operation
   */
  private performLogin(): void {
    this.setLoadingState(true);
    this.clearErrorMessage();

    const credentials: LoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error)
    });
  }

  /**
   * Handle successful login
   */
  private handleLoginSuccess(response: any): void {
    this.setLoadingState(false);
    console.log('Login successful:', response);
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handle login error
   */
  private handleLoginError(error: any): void {
    this.setLoadingState(false);
    this.errorMessage = error.message || 'Invalid username and password';
    console.error('Login error:', error);
    this.startErrorTimer();
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Set loading state
   */
  private setLoadingState(loading: boolean): void {
    this.loading = loading;
  }

  /**
   * Clear error message
   */
  private clearErrorMessage(): void {
    this.errorMessage = '';
  }

  /**
   * Start timer to auto-hide error message after 10 seconds
   */
  private startErrorTimer(): void {
    // Clear any existing timer
    if (this.errorTimer) {
      this.errorTimer.unsubscribe();
    }
    
    // Start a new 10-second timer
    this.errorTimer = timer(10000).subscribe(() => {
      this.errorMessage = '';
    });
  }

  /**
   * Cleanup on component destruction
   */
  ngOnDestroy(): void {
    if (this.errorTimer) {
      this.errorTimer.unsubscribe();
    }
  }
}
