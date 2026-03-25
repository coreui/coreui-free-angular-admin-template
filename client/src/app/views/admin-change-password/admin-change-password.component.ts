import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  FormDirective,
  FormControlDirective,
  ButtonDirective,
  SpinnerComponent,
  AlertComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilLockLocked, cilUser, cilCheckCircle, cilXCircle } from '@coreui/icons';
import type { ChangePasswordResponse } from '@f123dashboard/shared';

import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-change-password',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    FormDirective,
    FormControlDirective,
    ButtonDirective,
    SpinnerComponent,
    AlertComponent,
    IconDirective
  ],
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminChangePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private apiService = inject(ApiService);

  changePasswordForm: FormGroup;
  isLoading = signal(false);
  showSuccess = signal(false);
  showError = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  generatedPassword = signal('');

  // No need for icons object, icons are available directly
  cilLockLocked = cilLockLocked;
  cilUser = cilUser;
  cilCheckCircle = cilCheckCircle;
  cilXCircle = cilXCircle;

  constructor() {
    this.changePasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Check if user is admin
    const currentUser = this.authService.currentUser();
    if (!currentUser?.isAdmin) 
      {this.router.navigate(['/dashboard']);}
    
  }

  generateRandomPassword(): string {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async onSubmit(): Promise<void> {
    if (this.changePasswordForm.invalid) {
      Object.keys(this.changePasswordForm.controls).forEach(key => {
        this.changePasswordForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading.set(true);
    this.showSuccess.set(false);
    this.showError.set(false);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.generatedPassword.set('');

    try {
      const token = this.authService.getToken();
      if (!token) {
        this.showError.set(true);
        this.errorMessage.set('Sessione scaduta. Effettua nuovamente il login.');
        this.isLoading.set(false);
        return;
      }

      const { username } = this.changePasswordForm.value;
      const newPassword = this.generateRandomPassword();
      this.generatedPassword.set(newPassword);

      const result = await firstValueFrom(
        this.apiService.post<ChangePasswordResponse>('/auth/admin-change-password', {
          userName: username,
          newPassword: newPassword,
          jwtToken: token
        })
      );

      this.isLoading.set(false);

      if (result.success) {
        this.showSuccess.set(true);
        this.successMessage.set(`Password modificata con successo per l'utente ${username}. L'utente dovrà effettuare nuovamente il login.`);
        this.changePasswordForm.reset();
      } else {
        this.showError.set(true);
        this.errorMessage.set('Impossibile modificare la password. Verifica che l\'utente esista e riprova.');
        this.generatedPassword.set('');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      this.isLoading.set(false);
      this.showError.set(true);
      this.errorMessage.set('Si è verificato un errore durante la modifica della password. Riprova.');
      this.generatedPassword.set('');
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.changePasswordForm.get(fieldName);
    
    if (!control || !control.touched || !control.errors) 
      {return '';}
    

    if (control.errors['required']) 
      {return 'Questo campo è obbligatorio';}
    

    if (fieldName === 'username') 
      {if (control.errors['minlength']) 
        {return 'Il nome utente deve contenere almeno 3 caratteri';}}
      
    

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.changePasswordForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Errore durante la copia:', err);
    });
  }
}
