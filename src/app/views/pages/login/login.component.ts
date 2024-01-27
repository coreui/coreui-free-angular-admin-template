import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { IUserInfo } from 'src/app/services/user/user.type';
import {UserService} from "../../../services/user/user.service";
import {AuthenticationService} from "../../../services/authentication.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData: FormGroup | undefined;
  loginEmail: string = '';
  loginPassword: string = '';
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("[^ @]*@[^ @]*")
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  loginError: boolean = false;
  loginErrorMessage!: string;
  loginLoading: boolean = false;
  
  constructor(
    private userService: UserService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
    if (this.route.snapshot.data['action']) {
      this.auth.logout();
    }
    console.log(this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userData = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  setFormValue(value: string, type: string): void {
    if (type === 'email') {
      this.loginEmail = value;
    } else if (type === 'password') {
      this.loginPassword = value;
    }
  }

  login() {
    this.loginLoading = true;
    this.loginError = false;
    this.loginErrorMessage = '';

    const loginData = {
      email: this.loginEmail,
      password: this.loginPassword
    };

    this.userService.loginUser(loginData).subscribe({
      next: (response: IUserInfo) => {
        if (response !== null) {
          this.auth.setUserData(response.token.accessToken);
          this.loginLoading = false;
        }
      },
      error: err => {
        this.loginLoading = false;
        this.loginError = true;
        this.loginErrorMessage = err.error.message;
      }
    })
  }

  forgetPassword(): void {
    const email: string = this.userData.controls['email'].value;
    if (email === '') {
      this.loginError = true;
      this.loginErrorMessage = "Please enter email address";
    } else {
      this.userService.forgetPassword(email)
        .subscribe({
          next: (data: any) => {
            this.loginError = true;
            this.loginErrorMessage = data.message;
          }
        })
    }
  }

}
