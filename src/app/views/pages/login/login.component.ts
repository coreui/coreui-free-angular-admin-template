import { AuthService } from './../../../core/services/auth/auth.service';
import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule, CommonModule]
})
export class LoginComponent {

  username: string = 'admin@dev.local';
  password: string = 's3cr3t';

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signIn() {
    this.loading = true;
    this.authService.signIn(this.username, this.password).subscribe({
      next: (e) => {
        this.router.navigate(['/dahboard']);
        this.loading = false;
      },
      error: (e) => {
        console.log(e);

        this.loading = false;
      }
    })
  }

}
