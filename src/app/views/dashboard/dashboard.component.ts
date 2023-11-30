import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
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
  card = " DEBT"

  constructor() {
  }
  
}
