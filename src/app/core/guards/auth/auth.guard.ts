import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      if (this.authService.isLoggedIn() === false) {
        this.router.navigate(['/login']);
        return false;
      }

      console.log(true);


      return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      if (this.authService.isLoggedIn() === false) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
  }

}
