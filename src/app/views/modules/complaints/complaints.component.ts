import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
  ],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
})
export class ComplaintsComponent implements OnInit {

  public getJsonvalue: any;
  public displayColumn: string[] = [
    'id',
    'division',
    'received_complaints',
    'resolved_complaints',
    'days_0_30',
    'days_30_60',
    'days_60_90',
    'days_90',
    'resolution_status',
  ];
  public dataSource: any = [];

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getMethod();
  }
  public getMethod() {
    this.http.get('http://10.153.1.170/iso-dashboard/api/complaints-data.php').subscribe((data) => {
      console.table(data);
      this.getJsonvalue = data;
      this.dataSource = data;
    }

    );
  }


}