import { Component, OnInit } from '@angular/core';
import { cilArrowTop, cilOptions } from '@coreui/icons';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // dashboard items
  dashboard1 = "Monthly Scorecard"
  dashboard2 = "Initiative Performance"
  dashboard3 = "Total Initiatives"
  dashboard4 = "Budget Utilization"
  // cards names
  card1 = "PROFILES"
  card2 = "INVESTIGATION"
  card3 = "PROSECUTION"
  card4 = "OBJECTION REVIEW"
  card5 = "ADR"
  card6 = "DEBT"
   // PROFILES items
   profile1 = "No. of Profiles Disseminated"
   profile2 = "Revenue Estimate from Profiles"
   profile3 = "Revenue Conversions from Profiles"
   // INVESTIGATION items
   investigation1 = "No. of Profiles Received"
   investigation2 = "Tax Assessed"
   investigation3 = "Actual Tax Collection"
   // PROSECUTION items
   prosecution1 = "No. of Cases"
   prosecution2 = "Amount of Disputed Tax"
   prosecution3 = "No. of Closed Cases"
   // OBJECTION REVIEW items
   objection1 = "No. of Cases Objected"
   objection2 = "Tax Amount under Objection"
   // ADR items
   adr1 = "No. of Cases Objected"
   adr2 = "Tax Amount under Objection"
   // DEBT items
   debt1 = "Confirmed Debt"
   debt2 = "Collected Debt"
   debt3 = "Outstanding Debt"
   

  icons = { cilOptions, cilArrowTop };
  
  getPCProgressBarColor(percentage: number): string {
    if (percentage >= 90) {
      return 'green';
    } else if (percentage >= 80) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  progress: number = 0;

  updateProgress() {
    this.progress += 10;
    if (this.progress > 100) {
      this.progress = 0;
    }
  }

  ngOnInit() {}
}