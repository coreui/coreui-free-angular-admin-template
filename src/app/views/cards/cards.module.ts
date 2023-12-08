import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsRoutingModule } from './cards-routing.module';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { PcCardComponent } from './pc-card/pc-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  imports: [
    CardsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    BudgetCardComponent,
    PcCardComponent,
    ProfileCardComponent
   ],
  declarations: []
})
export class CardsModule {
}
