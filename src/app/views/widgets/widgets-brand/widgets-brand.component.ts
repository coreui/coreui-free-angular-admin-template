import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { ColComponent, RowComponent, WidgetStatDComponent } from '@coreui/angular';
import { ChartData } from 'chart.js';

type BrandData = {
  icon: string
  values: any[]
  capBg?: any
  color?: string
  labels?: string[]
  data: ChartData
}

@Component({
    selector: 'app-widgets-brand',
    templateUrl: './widgets-brand.component.html',
    styleUrls: ['./widgets-brand.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [RowComponent, ColComponent, WidgetStatDComponent, IconDirective, ChartjsComponent]
})
export class WidgetsBrandComponent implements AfterContentInit {
  private changeDetectorRef = inject(ChangeDetectorRef);


  readonly withCharts = input<boolean>();
  // @ts-ignore
  chartOptions = {
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
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
  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  datasets = {
    borderWidth: 2,
    fill: true
  };
  colors = {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff',
    pointBackgroundColor: 'rgba(255,255,255,.55)'
  };
  brandData: BrandData[] = [
    {
      icon: 'cibFacebook',
      values: [{ title: 'friends', value: '89K' }, { title: 'feeds', value: '459' }],
      capBg: { '--cui-card-cap-bg': '#3b5998' },
      labels: [...this.labels],
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Facebook', ...this.colors }]
      }
    },
    {
      icon: 'cibTwitter',
      values: [{ title: 'followers', value: '973k' }, { title: 'tweets', value: '1.792' }],
      capBg: { '--cui-card-cap-bg': '#00aced' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [1, 13, 9, 17, 34, 41, 38], label: 'Twitter', ...this.colors }]
      }
    },
    {
      icon: 'cib-linkedin',
      values: [{ title: 'contacts', value: '500' }, { title: 'feeds', value: '1.292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'LinkedIn', ...this.colors }]
      }
    },
    {
      icon: 'cilCalendar',
      values: [{ title: 'events', value: '12+' }, { title: 'meetings', value: '4' }],
      capBg: { '--cui-card-cap-bg': 'var(--cui-warning)' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    }
  ];

  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
