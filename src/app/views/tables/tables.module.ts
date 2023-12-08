import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TablesRoutingModule } from './tables-routing.module';

@NgModule({
  imports: [
    TablesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule
   ],
  declarations: []
})
export class TablesModule {
}
