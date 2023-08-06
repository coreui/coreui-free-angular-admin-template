import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



/**
 * Origo core module: contains all the model and services that can be potentially used by any feature
 * for example firebase services, or global notification services (see user-action-notification.service.ts)
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
