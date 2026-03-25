import { Component, inject, signal, computed, output, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  FormModule,
  GridModule,
  ModalBodyComponent,
  ModalComponent,
  ModalHeaderComponent,
  SpinnerComponent,
  AlertComponent
} from '@coreui/angular';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  styleUrls: ['./password-change-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    FormModule,
    ButtonDirective,
    GridModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    SpinnerComponent,
    AlertComponent
  ]
})
export class PasswordChangeModalComponent {
  private authService = inject(AuthService);

  modal = viewChild<ModalComponent>('passwordChangeModal');
  passwordChanged = output<void>();

  // Property to control visibility
  visible = signal(false);

  // Form fields
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  // UI state
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  currentUser = computed(() => this.authService.currentUser());

  public open(): void {
    this.resetForm();
    this.visible.set(true);
  }

  public close(): void {
    this.visible.set(false);
    this.resetForm();
  }

  // method to handle two-way binding
  handleVisibilityChange(event: boolean) {
    this.visible.set(event);
  }

  private resetForm(): void {
    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
    this.errorMessage.set('');
    this.successMessage.set('');
    this.isLoading.set(false);
  }

  private validateForm(): boolean {
    this.errorMessage.set('');

    if (!this.currentPassword().trim()) {
      this.errorMessage.set('La password attuale è obbligatoria');
      return false;
    }

    if (!this.newPassword().trim()) {
      this.errorMessage.set('La nuova password è obbligatoria');
      return false;
    }

    if (this.newPassword().length < 8) {
      this.errorMessage.set('La nuova password deve essere di almeno 8 caratteri');
      return false;
    }

    if (!this.authService.isPasswordStrong(this.newPassword())) {
      this.errorMessage.set('La password deve contenere almeno una lettera maiuscola, una lettera minuscola e un numero');
      return false;
    }

    if (this.newPassword() !== this.confirmPassword()) {
      this.errorMessage.set('Le password non corrispondono');
      return false;
    }

    if (this.currentPassword() === this.newPassword()) {
      this.errorMessage.set('La nuova password deve essere diversa da quella attuale');
      return false;
    }

    return true;
  }

  async onChangePassword(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {

      const response = await this.authService.changePassword(this.currentPassword(), this.newPassword());

      if (response.success) {
        this.successMessage.set('Password cambiata con successo!');
        this.passwordChanged.emit();
        
        // Close modal after a brief delay to show success message
        setTimeout(() => {
          this.close();
        }, 2000);
      } else {
        this.errorMessage.set(response.message || 'Errore durante il cambio password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      this.errorMessage.set('Si è verificato un errore durante il cambio password. Riprova più tardi.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onModalHidden(): void {
    this.resetForm();
  }
}
