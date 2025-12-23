import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../../services/auth.service';
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
  RowComponent
} from '@coreui/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent,ReactiveFormsModule, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class LoginComponent implements OnInit{
  form:FormGroup | any;
  constructor(private authService:AuthService,private router:Router){

  }
  ngOnInit(): void {
     this.form = new FormGroup({
        email: new FormControl(null,{validators:[Validators.required]}),
        password: new FormControl(null,{validators:[Validators.required]}),
     })
  }
  handleLogin(){
     if(this.form.invalid){
            return
      }
     this.authService.login(this.form.value.email,this.form.value.password);
  }
  navigateToRegister(){
     this.router.navigate(['/register'])
  }
}
