import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';

interface IChartProps {
  Data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Component({
  selector: 'app-widgets-brand',
  templateUrl: './widgets-brand.component.html',
  styleUrls: ['./widgets-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsBrandComponent implements OnInit {

  @Input() withCharts?: boolean;

  // @ts-ignore
  chartOptions = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
      intersect: true,
      // mode: 'index' ,
      position: 'nearest',
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    animation: {
      duration: 0,
    },
    responsive: true,
    responsiveAnimationDuration: 0,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  }

  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  datasets = {
    borderWidth: 2,
    fill: true,
  }
  brandData = [
    {
      icon: 'cibFacebook',
      values: [{title: 'friends', value: '89K'}, {title: 'feeds', value: '459'}],
      capBg: {'--cui-card-cap-bg': '#3b5998'},
      labels: [...this.labels],
      data: [65, 59, 84, 84, 51, 55, 40],
      datasets: [{...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Facebook'}]
    },
    {
      icon: 'cibTwitter',
      values: [{title: 'followers', value: '973k'}, {title: 'tweets', value: '1.792'}],
      capBg: {'--cui-card-cap-bg': '#00aced'},
      labels: [...this.labels],
      datasets: [{...this.datasets, data: [1, 13, 9, 17, 34, 41, 38], label: 'Twitter'}]
    },
    {
      icon: 'cib-linkedin',
      values: [{title: 'contacts', value: '500'}, {title: 'feeds', value: '1.292'}],
      capBg: {'--cui-card-cap-bg': '#4875b4'},
      labels: [...this.labels],
      datasets: [{...this.datasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'LinkedIn'}]
    },
    {
      icon: 'cilCalendar',
      values: [{title: 'events', value: '12+'}, {title: 'meetings', value: '4'}],
      color: 'warning',
      labels: [...this.labels],
      datasets: [{...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events'}]
    },
  ]

  constructor() {
  }

  get colors() {
    return [{
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff',
    }]
  }

  capStyle(value: string) {
    return !!value ? {'--cui-card-cap-bg': value} : {};
  }

  ngOnInit(): void {
  }
}
