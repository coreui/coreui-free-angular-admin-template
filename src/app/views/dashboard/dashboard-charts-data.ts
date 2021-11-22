import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';

export interface IChartProps {
  Data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  public mainChart: IChartProps = {};

  constructor() {
    this.initMainChart();
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // console.log(brandInfo, brandInfoBg);

    // mainChart
    this.mainChart.elements = period === 'Month' ? 12 : 27;
    this.mainChart.Data1 = [];
    this.mainChart.Data2 = [];
    this.mainChart.Data3 = [];

    // generate random values for mainChart
    for (let i = 0; i <= this.mainChart.elements; i++) {
      this.mainChart.Data1.push(this.random(50, 200));
      this.mainChart.Data2.push(this.random(80, 100));
      this.mainChart.Data3.push(65);
    }

    this.mainChart.Data = [
      {
        data: this.mainChart.Data1,
        label: 'Current'
      },
      {
        data: this.mainChart.Data2,
        label: 'Previous'
      },
      {
        data: this.mainChart.Data3,
        label: 'BEP'
      }
    ];

    if (period === 'Month') {
      this.mainChart.labels = [
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
        'December'
      ];
    } else {
      /* tslint:disable:max-line-length */
      this.mainChart.labels = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Thursday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];
    }
    /* tslint:enable:max-line-length */
    // @ts-ignore
    this.mainChart.options = {
      tooltips: {
        enabled: false,
        custom: customTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem: { datasetIndex: string | number; }, chart: { data: { datasets: { [x: string]: { borderColor: any; }; }; }; }) {
            return {
              backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor
            };
          }
        }
      },
      // animation: {
      //   duration: 0
      // },
      responsiveAnimationDuration: 0,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              callback: function (value: any) {
                return period === 'Month' ? value : value.charAt(0);
              }
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250
            }
          }
        ]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      },
      legend: {
        display: false
      }
    };
    this.mainChart.colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5]
      }
    ];
    this.mainChart.legend = false;
    this.mainChart.type = 'line';
  }

}
