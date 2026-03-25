import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { PasswordChangeModalComponent } from './password-change-modal.component';

describe('PasswordChangeModalComponent', () => {
  let component: PasswordChangeModalComponent;
  let fixture: ComponentFixture<PasswordChangeModalComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['changePassword', 'isPasswordStrong'], { currentUser: signal(null) });

    await TestBed.configureTestingModule({
      imports: [PasswordChangeModalComponent,
        FormsModule
      ],
      providers: [provideNoopAnimations(), { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChangeModalComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close modal', () => {
    expect(component.visible()).toBeFalsy();
    
    component.open();
    expect(component.visible()).toBeTruthy();
    
    component.close();
    expect(component.visible()).toBeFalsy();
  });

  it('should check password strength via authService', () => {
    mockAuthService.isPasswordStrong.and.callFake((password: string) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      return hasUppercase && hasLowercase && hasNumber;
    });

    expect(mockAuthService.isPasswordStrong('weak')).toBeFalsy();
    expect(mockAuthService.isPasswordStrong('Weak123')).toBeTruthy();
    expect(mockAuthService.isPasswordStrong('weak123')).toBeFalsy();
    expect(mockAuthService.isPasswordStrong('WEAK123')).toBeFalsy();
    expect(mockAuthService.isPasswordStrong('WeakPass')).toBeFalsy();
    expect(mockAuthService.isPasswordStrong('Strong123')).toBeTruthy();
  });

  it('should reset form on close', () => {
    component.currentPassword.set('test');
    component.newPassword.set('test123');
    component.confirmPassword.set('test123');
    component.errorMessage.set('Error');
    component.visible.set(true);

    component.close();

    expect(component.currentPassword()).toBe('');
    expect(component.newPassword()).toBe('');
    expect(component.confirmPassword()).toBe('');
    expect(component.errorMessage()).toBe('');
    expect(component.visible()).toBeFalsy();
  });
});
