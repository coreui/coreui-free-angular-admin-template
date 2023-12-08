import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';

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

   budget: number = 157211964
   utilized: number = 17589618.96
   percentage: number = (this.utilized/this.budget)*100

  getPCProgressBarColor(percentage: number): string {
    if (percentage >= 90) {
      return 'success';
    } else if (percentage >= 80) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
  
  getProgressBarColor(percentage: number): string {
    if (percentage >= 80) {
      return 'success';
    } else if (percentage >= 50) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  progress: number = 0;

  updateProgress() {
    this.progress += 1;
    if (this.progress > 100) {
      this.progress = 100;
    }
  }

  ngOnInit() {}

}
