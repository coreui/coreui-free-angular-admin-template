import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {IUserInfo} from "../user/user.type";
import {JWTTokenService} from '../auth/jwttoken.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private jwtService: JWTTokenService
  ) {
  }

  canActivate(): Promise<boolean> {
    let userValue = localStorage.getItem('USER_DATA');
    return this.authService.userData.then((bearer: string) => {
      if (bearer) {
        this.jwtService.setToken(bearer);
        if (!this.jwtService.isTokenExpired()) {
          return true;
        }
      }
      this.router.navigate(['/login'], {});
      return false;
    });
  }

}
