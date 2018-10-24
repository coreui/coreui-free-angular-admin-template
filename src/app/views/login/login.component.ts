import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  ngOnInit() {
    document.querySelector('body').classList.add('justify-content-center');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('justify-content-center');
  }
}
