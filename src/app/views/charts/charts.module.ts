import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
  imports: [
    ChartsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule
   ],
  declarations: []
})
export class ChartsModule {
}
