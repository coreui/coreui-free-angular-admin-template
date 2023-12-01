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
  card6 = " DEBT"

  icons = { cilOptions, cilArrowTop };

  getProgressBarColor(percentage: number): string {
    if (percentage > 90) {
      return 'green';
    } else if (percentage > 80) {
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