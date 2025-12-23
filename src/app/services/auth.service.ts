import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin, UserRegister } from '../model/auth.model';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn:'root'
})
export class AuthService implements OnInit{
    private authStatusListener = new Subject<boolean>();
    constructor(public http:HttpClient,private router:Router){}
    token:any;
    ngOnInit(): void {

    }

    registerUser(username:string,password:string,email:string,image:File){
      const form = new FormData();
      form.append('username',username);
      form.append('password',password);
      form.append('email',email);
      form.append('image',image);

      this.http.post<{message:string,userReg:UserRegister}>
      ('http://localhost:8000/api/auth/register',form)
      .subscribe(responseData=>{
             alert("Registration Successfully");
            this.router.navigateByUrl('/login')
      },error=>{
          if(error.status === 400){
              this.authStatusListener.next(false);
              console.log(error)
              alert(error.error.message)
          }

        })
      }

      login(email:string,password:string){
          const form = new FormData();
          form.append('email',email);
          form.append('password',password);

          this.http.post<{
            token: any;message:string,userLogin:UserLogin
           }>
          ('http://localhost:8000/api/auth/login',form)
          .subscribe(responseData=>{
              this.token = responseData.token;
              localStorage.setItem('token', responseData.token);
              const helper = new JwtHelperService();
              const decodedToken= helper.decodeToken(this.token);
              localStorage.setItem('userInfo', JSON.stringify(decodedToken));
              console.log(decodedToken);
              alert("Login Successfully");
              this.router.navigateByUrl('/');
          },error=>{
              if(error.status === 400){
                this.authStatusListener.next(false);
                console.log(error)
                alert(error.error.message)
              }
          })
      }
  getAuthenticationToken(){
       return localStorage.getItem('token');
  }
  getDecodeToken(){
    return localStorage.getItem('userInfo');
  }
  // Remove token
  public removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }
}
