import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Assume you have an authentication service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  decodeToken:any;
  decodedTxt:any;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.decodeToken = this.authService.getDecodeToken();
    this.decodedTxt = JSON.parse(this.decodeToken);
    if (this.decodedTxt?.isAdmin) {
      console.log("Admin")
      this.router.navigate(['/forms/form-control']);
      return true
    } else {
        console.log("User")
      return false; // Block navigation
    }
  }
}
