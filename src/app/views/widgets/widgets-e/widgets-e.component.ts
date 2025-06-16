import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, WidgetStatEComponent, TextColorDirective } from '@coreui/angular';

@Component({
    selector: 'app-widgets-e',
    templateUrl: './widgets-e.component.html',
    styleUrls: ['./widgets-e.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [RowComponent, ColComponent, TextColorDirective, WidgetStatEComponent, ChartjsComponent]
})
export class WidgetsEComponent implements AfterContentInit {
  private changeDetectorRef = inject(ChangeDetectorRef);


  constructor() {
    this.prepareLabels();
    this.prepareDatasets();
    this.prepareData();
  }

  datasets: any[] = [];
  labels: string[] = [];
  data: any[] = [];
  barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  lineOptions = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };

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

  get baseDatasets(): Array<any> {
    return [
      {
        data: this.randomData,
        barThickness: 'flex',
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointHoverBorderColor: 'transparent',
        borderWidth: 1
      }
    ];
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  prepareData() {
    for (let i = 0; i < 6; i++) {
      this.data.push({ labels: this.labels, datasets: this.datasets[i] });
    }
  }

  prepareLabels() {
    for (let i = 0; i < 15; i++) {
      this.labels.push(this.getDayName(i));
    }
  }

  prepareDatasets() {
    const params = [
      { backgroundColor: 'danger' },
      { backgroundColor: 'primary' },
      { backgroundColor: 'secondary' },
      { borderColor: 'danger', borderWidth: 2 },
      { borderColor: 'success', borderWidth: 2 },
      { borderColor: 'info', borderWidth: 2 }
    ];
    for (let i = 0; i < 6; i++) {
      this.datasets.push(this.getDataset(params[i]));
    }
  }

  getDataset({ backgroundColor = 'transparent', borderColor = 'transparent', borderWidth = 1 }) {
    const dataset = this.baseDatasets;
    dataset[0].backgroundColor = backgroundColor !== 'transparent' ? getStyle(`--cui-${backgroundColor}`) : backgroundColor;
    dataset[0].borderColor = borderColor !== 'transparent' ? getStyle(`--cui-${borderColor}`) : borderColor;
    dataset[0].pointBackgroundColor = getStyle(`--cui-${borderColor}`);
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
