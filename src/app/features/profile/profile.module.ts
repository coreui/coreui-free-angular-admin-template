import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './components/edit/edit.component';
import { MyMessagesComponent } from './components/my-messages/my-messages.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CoreUiDepsModule } from '@coreui-deps/coreui-deps.module';


@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent,
    MyMessagesComponent
  ],
  imports: [
    ProfileRoutingModule,
    CoreUiDepsModule
  ]
})
export class ProfileModule { }
