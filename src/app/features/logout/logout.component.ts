import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { concatMap, Observable, ObservableInput, of } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { CountdownService } from '@core/services/countdown.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  countDown: Observable<number> | null = null;

  constructor(readonly router: Router, readonly authSvc: AuthService, readonly countdownSvc: CountdownService) { }

  ngOnInit(): void {
    
   this.countDown = this.countdownSvc.countDown(() => {
     this.router.navigateByUrl('');
   })

   of(this.authSvc.signOut()).pipe(concatMap((logoutRes, index) => {
     return  this.countDown as ObservableInput<any>;
   }));

  }



}

