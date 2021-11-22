import { Component, OnInit } from '@angular/core';

import { getStyle } from '@coreui/utils/src';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {

  chartDatasets: any[] = [];
  labels: string[] = [];

  options = {
    responsive: true,
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, this.datasets[0].data) - 5,
            max: Math.max.apply(Math, this.datasets[0].data) + 5,
          },
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

  constructor() {
    this.prepareLabels();
    this.prepareData();
  }

  get random() {
    const min = 40,
      max = 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  get randomData() {
    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push(this.random);
    }
    return data;
  }

  get datasets(): Array<any> {
    return [
      {
        data: this.randomData,
        barPercentage: 0.5,
        categoryPercentage: 1,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderWidth: 1,
      },
    ];
  }

  ngOnInit(): void {}

  prepareLabels() {
    for (let i = 0; i < 15; i++) {
      this.labels.push(this.getDayName(i))
    }
  }

  prepareData() {
    const params = [
      { backgroundColor: 'danger' },
      { backgroundColor: 'primary' },
      { borderColor: 'light', borderWidth: 2 },
      { borderColor: 'danger', borderWidth: 2 },
      { borderColor: 'success', borderWidth: 2 },
      { borderColor: 'info', borderWidth: 2 },
    ];
    for (let i = 0; i < 6; i++) {
      this.chartDatasets.push(this.getDataset(params[i]));
    }
  }

  getDataset({
    backgroundColor = 'transparent',
    borderColor = 'transparent',
    borderWidth = 1,
  }) {
    const dataset = this.datasets;
    dataset[0].backgroundColor =
      backgroundColor !== 'transparent'
        ? getStyle(`--cui-${backgroundColor}`)
        : backgroundColor;
    dataset[0].borderColor =
      borderColor !== 'transparent'
        ? getStyle(`--cui-${borderColor}`)
        : borderColor;
    dataset[0].borderWidth = borderWidth;
    return dataset;
  }

  getDayName(shift = 0) {
    // @ts-ignore
    const locale = navigator.language ?? navigator.userLanguage ?? navigator.systemLanguage ?? navigator.browserLanguage ?? 'en-US';
    const baseDate = new Date(Date.UTC(2000, 1, 0)); // Monday
    baseDate.setDate(baseDate.getDate() + shift);
    return baseDate.toLocaleDateString(locale, { weekday: 'short' });
  }
}
