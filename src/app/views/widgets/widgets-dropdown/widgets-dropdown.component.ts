import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getStyle } from '@coreui/utils/src';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsDropdownComponent implements OnInit {

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
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
  ];

  datasets = [
    [{
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40],
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 9, 17, 34, 22, 11],
    }], [{
      label: 'My Third dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true,
    }], [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7,
    }]
  ]

  chartOptionsDefault = {
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
    animation: {
      duration: 0,
    },
    responsiveAnimationDuration: 0,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 40 - 5,
            max: 84 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6,
      },
    },
    legend: {
      display: false,
    },
  };

  constructor() {
  }

  chartOptions(index: number) {
    const options = JSON.parse(JSON.stringify(this.chartOptionsDefault))
    options.tooltips = {
      enabled: false,
      custom: customTooltips,
    }
    switch (index) {
      case 1: {
        const yAxes = [{
          display: false,
          ticks: {min: 1 - 5, max: 34 + 5},
        }];
        const line = {
          borderWidth: 1,
          tension: 0,
        }
        options.scales = {...options.scales, yAxes};
        options.elements = {...options.elements, line};
      }
        break;
      case 2: {
        const xAxes = [{
          display: false,
        }];
        const yAxes = [{
          display: false,
        }];
        const point = {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 6
        };
        const line = {
          borderWidth: 2,
        }
        options.scales = {...options.scales, xAxes, yAxes};
        options.elements = {...options.elements, point, line};
      }
        break;
      case 3:
        const xAxes = [{
          display: false,
        }];
        const yAxes = [{
          display: false,
        }];
        options.scales = {...options.scales, xAxes, yAxes};
        break;
    }
    return options;
  }

  ngOnInit(): void {
  }

}
