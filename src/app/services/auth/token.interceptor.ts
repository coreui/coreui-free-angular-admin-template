import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.match(/api.gozisk.com\//) || request.url.match(/localhost:8080\//)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
          "Bypass-Tunnel-Reminder": 'anything'
        }
      });
      return next.handle(request);
    } else if (request.url.match(/sayem7746.loca.lt\//)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
          "Bypass-Tunnel-Reminder": 'anything'
        }
      });
      return next.handle(request);
    }
    else {
      return next.handle(request);
    }
  }
}
