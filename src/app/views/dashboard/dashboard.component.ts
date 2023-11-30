import { Component, OnInit } from '@angular/core';
import { cilArrowTop, cilOptions } from '@coreui/icons';
import { getStyle } from '@coreui/utils';

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
  card = " DEBT"

  icons = { cilOptions, cilArrowTop };

  data: any = {};
  options: any = {};

  labels = [
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  datasets = [
    {
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40, 59, 84, 84, 51, 55]
    }
  ];

  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.data = {
      labels: this.labels.slice(0, 7),
      datasets: this.datasets
    };
    this.options = this.optionsDefault;
  }
}
