import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor() { }

  ngOnInit() {
    document.querySelector('body').classList.add('justify-content-center');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('justify-content-center');
  }
}
