import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { ProfileModule } from './profile/profile.module';
import { CoreUiDepsModule } from '@coreui-deps/coreui-deps.module';
import { SharedModule } from '@shared/shared.module';

/**
 * Origo feature module
 */
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    ProfileModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    CoreUiDepsModule,
    SharedModule
  ]
})
export class FeaturesModule { }
