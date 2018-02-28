import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ButtonsComponent } from './buttons.component';
import { SocialButtonsComponent } from './social-buttons.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownsComponent } from './dropdowns.component';

// Buttons Routing
import { ButtonsRoutingModule } from './buttons-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ButtonsComponent,
    DropdownsComponent,
    SocialButtonsComponent
  ]
})
export class ButtonsModule { }
