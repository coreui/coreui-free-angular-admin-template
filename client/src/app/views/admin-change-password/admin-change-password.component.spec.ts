import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminChangePasswordComponent } from './admin-change-password.component';
import { AuthService } from 'src/app/service/auth.service';

describe('AdminChangePasswordComponent', () => {
  let component: AdminChangePasswordComponent;
  let fixture: ComponentFixture<AdminChangePasswordComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getToken'], { currentUser: signal({ id: 1, username: 'test', name: 'Test', surname: 'User', isAdmin: false }) });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AdminChangePasswordComponent, ReactiveFormsModule],
      providers: [provideNoopAnimations(), { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChangePasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect non-admin users', async () => {
    TestBed.resetTestingModule();
    const nonAdminAuthService = jasmine.createSpyObj('AuthService', ['getToken'], { currentUser: signal({ id: 1, username: 'test', name: 'Test', surname: 'User', isAdmin: false }) });
    const testRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [AdminChangePasswordComponent, ReactiveFormsModule],
      providers: [
        provideNoopAnimations(),
        { provide: AuthService, useValue: nonAdminAuthService },
        { provide: Router, useValue: testRouter }
      ]
    }).compileComponents();
    
    const testFixture = TestBed.createComponent(AdminChangePasswordComponent);
    testFixture.detectChanges();
    await testFixture.whenStable();
    expect(testRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should initialize form with empty values', () => {
    fixture.detectChanges();
    expect(component.changePasswordForm.get('username')?.value).toBe('');
  });

  it('should validate username is required', () => {
    fixture.detectChanges();
    const form = component.changePasswordForm;
    const usernameControl = form.get('username');
    
    expect(usernameControl?.hasError('required')).toBeTruthy();
    
    usernameControl?.setValue('user');
    expect(usernameControl?.hasError('required')).toBeFalsy();
  });
});
