import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

interface Budget {
  id: number;
  division: string;
  breakfast_lunch: number;
  per_diem: number;
  ticketing_travel: number;
  conference: number;
  accountable_imprest: number;
  total_expenditure: number;
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = [
    "id",
    "division",
    "breakfast_lunch",
    "per_diem",
    "ticketing_travel",
    "conference",
    "accountable_imprest",
    "total_expenditure"
  ];
  transactions: Budget[] = [];

  constructor(private http: HttpClient) { } // Inject HttpClient in the constructor

  ngOnInit() {
    // Call your HTTP service here to retrieve data
    this.http.get<Budget[]>('http://10.153.1.170/iso-dashboard/api/budget-data.php')
      .subscribe(data => {
        this.transactions = data;
      });
  }
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.total_expenditure).reduce((acc, value) => acc + value, 0);
  }
}
