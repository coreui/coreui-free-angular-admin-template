import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule, ModalModule, SpinnerModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { AgGridAngular, AgGridModule, ICellRendererAngularComp } from '@ag-grid-community/angular';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { ShowSaleRenderer } from "./cell-renderer/show-sale-renderer.component";
import { ICellRendererParams } from '@ag-grid-community/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

interface IRow {
  value: number | string;
  type: "age" | "gender" | "mood";
}

@Component({
  selector: 'app-purchased-list',
  standalone: true,
  imports: [
    CommonModule,
    IconModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule,
    ChartjsModule,
    TabsModule,
    ModalModule,
    SpinnerModule,
    FormsModule,
    AgGridAngular,
    AgGridModule,
    ShowSaleRenderer,
    NgbDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchased-list.component.html',
  styleUrl: './purchased-list.component.scss',
  providers: [DatePipe]
})
export class PurchasedListComponent {
  loadingPurchaseList: boolean;
  purchasedList: any[];
  rowData = [];
  showGroupSale: boolean = false;
  selectedUser: any;
  fetchTotalSaleLoading: boolean = false;
  totalGroupSale: number = 0;

  // Bootstrap date range selector
  calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
  agGridParams: any;

  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 30);

  // Column Definitions: Defines & controls grid columns.
  colDefs: any[] = [
    { headerName: '#', field: "id", filter: true, width: 100, sort: 'asc' },
    { headerName: 'Username', field: "username", filter: true },
    { headerName: 'Email', field: "email", filter: true },
    { headerName: 'Investment', field: "investment", filter: true },
    { headerName: 'Purchased On', field: "purchased_on", filter: true },
    {
      headerName: 'Action',
      cellRenderer: ShowSaleRenderer
    }
  ];

  frameworkComponents = {
    buttonCellRenderer: ShowSaleRenderer, // Correct key-value mapping
  };

  constructor(private walletService: WalletService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchAllPurchasedList();
  }

  assign() {
    alert("Assigned");
  }

  fetchAllPurchasedList(): void {
    // fetch all withdrawal list
    this.loadingPurchaseList = true;
    this.walletService.fetchAllPurchase()
      .subscribe({
        next: (walletList: any[]) => {
          this.purchasedList = walletList;
          this.purchasedList.forEach((item, i) => {
            this.rowData.push({
              "id": parseInt(item.purchase_id),
              "username": item.username,
              "email": item.email,
              "investment": `$${item.invest_amount}`,
              "purchased_on": this.datePipe.transform(item.purchased_on, 'MM-dd-YYYY'),
              "sale_id": item.id
            });
          });
          // window.addEventListener('resize', () => this.onGridReady());
        }
      });
  }

  showSale(data: any): void {
    this.showGroupSale = true;
    this.selectedUser = data;
    this.fetchTotalSaleLoading = false;
  }

  getRounded(value: number): number {
    return Math.trunc(value * 10000) / 10000;
  }

  // onGridReady(params = this.agGridParams) {
  //   this.agGridParams = params;
  //   params.api.sizeColumnsToFit();
  // }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  fetchTotalSale() {
    this.fetchTotalSaleLoading = true;
    this.totalGroupSale = 0;
    if (!this.fromDate || !this.toDate){
      this.resetGroupSale();
      return;
    }
    const dateFrom = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
    const dateTo = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;
    this.walletService.fetchGroupSale(this.selectedUser.sale_id, dateFrom, dateTo)
      .subscribe({
        next: (groupSale: any) => {
          this.totalGroupSale = groupSale.reduce((n, {invest_amount}) => n + invest_amount, 0);

          this.resetGroupSale();
        }
      });
  }

  resetGroupSale() {
    this.fetchTotalSaleLoading = false;
  }
}