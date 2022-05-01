import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditInvitationComponent } from './edit-invitation.component';

const routes: Routes = [
  {
    path: '',
    component: EditInvitationComponent,
    data: {
      title: 'Davetiye Güncelle',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInvitationRoutingModule {}

