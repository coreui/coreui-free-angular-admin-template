import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormConfig, RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, RxwebValidators.email()]],
      password: ['', Validators.required]
    });
    ReactiveFormConfig.set({
      "validationMessage": {
          "email": "Invalid email format",
      }
    });
  }

  ngOnInit(): void {
    this.loginForm.reset();
  }


  async onSubmitCredentials() {
    let error = await this.authService.signIn(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
    this.loginForm.reset();
    !!error ? window.alert(`Login failed with ${error} check your credentials and retry`) : this.router.navigateByUrl('/home')

  }

}
