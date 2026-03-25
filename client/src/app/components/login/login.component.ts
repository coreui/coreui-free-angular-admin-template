import { Component, ViewChild, inject, signal, computed, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModule } from '@coreui/angular';
import { AuthService } from './../../service/auth.service';
import {
  AvatarComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  GridModule,
  ButtonDirective,
  SpinnerModule,
} from '@coreui/angular';
import { DbDataService } from '../../../app/service/db-data.service';
import { cilWarning, cilAccountLogout, cilLockLocked } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { cilUser } from '@coreui/icons';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { PasswordChangeModalComponent } from '../password-change-modal/password-change-modal.component';
import type { User } from '@f123dashboard/shared';

@Component({
  selector: 'login-component',
  imports: [
    CommonModule,
    FormsModule,
    FormModule,
    ButtonDirective,
    GridModule,
    IconDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    AvatarComponent,
    SpinnerModule,
    RegistrationModalComponent,
    PasswordChangeModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dbData = inject(DbDataService);

  icons = { cilUser, cilLockLocked };
  
  // Current user data (signals from auth service)
  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  // Login form fields (signals)
  username = signal('');
  password = signal('');

  // State management (signals)
  isLoading = signal(false);
  errorMessage = signal('');

  // Validation errors (signals)
  usernameError = signal('');
  passwordError = signal('');

  // Grid gutter configuration (readonly to prevent recreation on change detection)
  readonly gutterConfig = { gy: 3 };

  // Computed values
  isLoggedIn = computed(() => !!this.currentUser());
  userDisplayName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.name} ${user.surname}` : '';
  });
  userId = computed(() => {
    const user = this.currentUser();
    return user ? String(user.id) : 'default';
  });
  avatarSrc = computed(() => this.dbData.getAvatarSrc(this.currentUser()));

  public warningIcon: string[] = cilWarning;
  public logoutIcon: string[] = cilAccountLogout;

  @ViewChild('loginDropdown') dropdown!: DropdownComponent;
  @ViewChild('registrationModal') registrationModal!: RegistrationModalComponent;
  @ViewChild('passwordChangeModal') passwordChangeModal!: PasswordChangeModalComponent;

  async onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    if (!this.validateLoginForm()){
      return;
    }
    try {
      // First try login without navigation to check if email is missing
      const response = await this.authService.login({
        username: this.username(),
        password: this.password()
      }, true); // Skip navigation initially

      if (response.success) {
        this.dropdown.toggleDropdown();

        // Check if user has email, if not open registration modal for email completion
        if (response.user && (!response.user.mail || response.user.mail.trim() === '')) {
          console.log('User email is missing, opening email completion modal.');
          this.isLoading.set(false);
          this.errorMessage.set('È necessario completare il profilo inserendo un indirizzo email valido.');
          setTimeout(() => {
            this.errorMessage.set(''); // Clear error message before opening modal
            this.openEmailCompletionModal(response.user!);
          }, 100); // Small delay to ensure modal is ready
          return;
        }
        const user = this.currentUser();
        this.isLoading.set(true);
        this.errorMessage.set('');
        
        // If email is present, perform navigation manually
        const returnUrl = user?.isAdmin ? '/admin' : '/fanta';
        this.router.navigate([returnUrl]);
      } else {
        this.errorMessage.set(response.message || 'Login fallito. Riprova.');
      }
    } catch (error) {
      this.errorMessage.set('Si è verificato un errore durante il login. Riprova.');
      console.error('Login error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      // Signals will automatically update via toSignal subscriptions
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  private validateLoginForm(): boolean {
    this.usernameError.set('');
    this.passwordError.set('');

    if (!this.username()) {
      this.usernameError.set('Nome utente obbligatorio');
      this.isLoading.set(false);
      return false;
    }

    if (!this.password()) {
      this.passwordError.set('Password obbligatoria');
      this.isLoading.set(false);
      return false;
    }

    return true;
  }

  openRegistrationModal() {
    this.registrationModal.openForRegistration();
  }

  openEmailCompletionModal(user: User) {
    this.registrationModal.openForEmailCompletion(user);
  }

  openUserProfileModal() {
    const user = this.currentUser();
    if (user) {
      this.registrationModal.openForUpdate(user);
    }
  }

  openPasswordChangeModal() {
    this.passwordChangeModal.open();
  }

  onRegistrationSuccess() {
    // Gestisce la registrazione avvenuta con successo
    // Signals will automatically update via toSignal subscriptions
  }

  onUpdateSuccess() {
    // Gestisce l'aggiornamento del profilo avvenuto con successo
    const user = this.currentUser();
    
    // Se l'utente ha appena completato la sua email, segnalo come autenticato e navigo
    if (user && user.mail && user.mail.trim() !== '') {
      this.authService.markUserAsAuthenticated();
      const returnUrl = user.isAdmin ? '/admin' : '/fanta';
      this.router.navigate([returnUrl]);
    }
    
    // Opzionalmente mostra un messaggio di successo o aggiorna i dati utente
  }

  onPasswordChanged() {
    // Gestisce il cambio password avvenuto con successo
    console.log('Password modificata con successo');
    // Potrebbe mostrare un messaggio di successo o eseguire altre azioni
  }
}