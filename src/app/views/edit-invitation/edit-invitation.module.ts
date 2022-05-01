import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, ButtonGroupModule, BadgeModule, CardModule, GridModule, FormModule, DropdownModule,ImgModule,UtilitiesModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { EditInvitationRoutingModule } from './edit-invitation-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { EditInvitationComponent } from './edit-invitation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditInvitationComponent],
  imports: [
    CommonModule, DropdownModule,ImgModule ,
    EditInvitationRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    UtilitiesModule,
    FormsModule  
  ]
})
export class EditInvitationModule {
 
}
