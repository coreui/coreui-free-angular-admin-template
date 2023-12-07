import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  id: number;
  staff_no: number;
  employee_name: string;
  gender: string;
  cadre: string;
  department: string;
  region: string;
  division: string;
  section: string;
  temporary_away: string;
  leave_balance: number;
  leave_status: string;
}


@Component({
  selector: 'app-staffdata',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './staffdata.component.html',
  styleUrl: './staffdata.component.scss'
})
export class StaffdataComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'staff_no', 'employee_name', 'gender', 'cadre', 'department', 'region', 'division', 'section', 'temporary_away', 'leave_balance', 'leave_status'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<UserData>();
  }

  ngOnInit() {
    // Make the HTTP request to get user data
    this.http.get<UserData[]>('http://10.153.1.170/iso-dashboard/api/staff-data.php?query=all').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
