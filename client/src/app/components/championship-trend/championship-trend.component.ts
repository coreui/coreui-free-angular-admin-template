import { NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal, DOCUMENT } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  RowComponent
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { DashboardChartsData, IChartProps } from '../../views/dashboard/dashboard-charts-data';

@Component({
  selector: 'app-championship-trend',
  templateUrl: './championship-trend.component.html',
  styleUrls: ['./championship-trend.component.scss'],
  imports: [
    CommonModule,
    NgStyle,
    ReactiveFormsModule,
    ChartjsComponent,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ButtonDirective,
    CardFooterComponent,
    GutterDirective
  ],
  providers: [DashboardChartsData]
})
export class ChampionshipTrendComponent implements OnInit {

  constructor() {}

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Year')
  });

  ngOnInit(): void {
    this.setTrafficPeriod('Year', 0);
    this.updateChartOnColorModeChange();
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string, numberOfRaces: number): void {
    this.#chartsData.initMainChart(value, numberOfRaces);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }
}