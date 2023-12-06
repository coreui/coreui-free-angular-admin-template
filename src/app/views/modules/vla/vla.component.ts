import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyPipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-vla',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    CurrencyPipe
  ],
  templateUrl: './vla.component.html',
  styleUrl: './vla.component.scss'
})
export class VlaComponent {
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
