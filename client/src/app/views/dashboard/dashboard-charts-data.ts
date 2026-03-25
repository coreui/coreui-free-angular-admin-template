import { Injectable, inject } from '@angular/core';
import {
  ChartData,
  ChartDataset,
  ChartOptions,
  ChartType,
  ScaleOptions
} from 'chart.js';

import { getStyle } from '@coreui/utils';
import { DbDataService } from '../../service/db-data.service'; 
import type { CumulativePointsData } from '@f123dashboard/shared';

// Constants
const DEFAULT_CHART_SCALE = 500;
const MONTH_PERIOD_ELEMENTS = 12;
const ALL_PERIOD_ELEMENTS = 27;
const DEFAULT_MAX_RACES = 8;
const SCALE_ROUNDING = 100;
const DESKTOP_BREAKPOINT = 900;

const DRIVER_COLORS = [
  '#8a2be2', '#32cd32', '#c0c0c0', '#f86c6b', '#ffa500', '#6495ed',
  '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'
];

interface Track {
  name: string;
  country: string;
  [key: string]: any;
}

type DriverDataMap = Record<string, (number | null)[]>;

export interface IChartProps {
  data?: ChartData;
  labels?: string[];
  options?: ChartOptions;
  colors?: any;
  type: ChartType;
  legend?: any;
  elements?: number;
  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  private dbData = inject(DbDataService);

  public mainChart: IChartProps = { type: 'line' };
  public championshipTrend: CumulativePointsData[] = [];
  public championshipTracks: Track[] = [];

  private chartScale: number = DEFAULT_CHART_SCALE;

  constructor() {
    this.initMainChart();
  }


  /**
   * Initialize the main championship chart with cumulative points data.
   * @param period - Chart period: 'Month' shows last N races, 'all' shows entire season
   * @param maxNumberOfRaces - Maximum number of races to display in Month view
   */
  initMainChart(period = 'all', maxNumberOfRaces: number = DEFAULT_MAX_RACES): void {
    this.loadChartData();
    
    const completedTracks = this.getCompletedTracks();
    const uniqueDrivers = this.getUniqueDrivers();
    
    this.mainChart.elements = period === 'Month' ? MONTH_PERIOD_ELEMENTS : ALL_PERIOD_ELEMENTS;
    
    const { labels, driverData } = period === 'Month' 
      ? this.prepareMonthPeriodData(completedTracks, maxNumberOfRaces, uniqueDrivers)
      : this.prepareAllPeriodData(completedTracks.length, uniqueDrivers);
    
    this.updateChartConfiguration(labels, driverData, uniqueDrivers);
  }

  /**
   * Load championship trend and track data from the database service.
   */
  private loadChartData(): void {
    this.championshipTrend = this.dbData.cumulativePoints();
    this.championshipTracks = this.dbData.tracks();
  }

  /**
   * Get list of tracks that have completed races.
   */
  private getCompletedTracks(): Track[] {
    const completedTrackNames = new Set(
      this.championshipTrend.map(item => item.track_name)
    );
    
    return this.championshipTracks.filter(track => 
      completedTrackNames.has(track.name)
    );
  }

  /**
   * Get unique list of driver usernames from championship data.
   */
  private getUniqueDrivers(): string[] {
    return [...new Set(this.championshipTrend.map(item => item.driver_username))];
  }

  /**
   * Group championship data by driver username.
   */
  private groupDataByDriver(): DriverDataMap {
    const driverData: DriverDataMap = {};
    
    for (const trendItem of this.championshipTrend) {
      if (!driverData[trendItem.driver_username]) 
        {driverData[trendItem.driver_username] = [];}
      
      driverData[trendItem.driver_username].push(Number(trendItem.cumulative_points));
    }
    
    return driverData;
  }

  /**
   * Prepare data for the Month period view (showing last N races).
   */
  private prepareMonthPeriodData(
    completedTracks: Track[], 
    maxNumberOfRaces: number,
    uniqueDrivers: string[]
  ): { labels: string[], driverData: DriverDataMap } {
    const tracksToUse = this.selectTracksForMonthView(completedTracks, maxNumberOfRaces);
    const labels = tracksToUse.map(track => track.country);
    
    const driverData = this.groupDataByDriver();
    const processedDriverData = this.processMonthPeriodDriverData(
      driverData, 
      completedTracks.length, 
      maxNumberOfRaces
    );
    
    return { labels, driverData: processedDriverData };
  }

  /**
   * Select which tracks to display in Month view.
   */
  private selectTracksForMonthView(completedTracks: Track[], maxNumberOfRaces: number): Track[] {
    const numberOfCompletedRaces = completedTracks.length;
    
    if (numberOfCompletedRaces < maxNumberOfRaces) {
      // Include upcoming races to fill the chart
      const racesNeeded = maxNumberOfRaces - numberOfCompletedRaces;
      const completedTrackNames = new Set(completedTracks.map(t => t.name));
      
      const upcomingTracks = this.championshipTracks
        .filter(track => !completedTrackNames.has(track.name))
        .slice(0, racesNeeded);
      
      return [...completedTracks, ...upcomingTracks];
    } else {
      // Show only the last N completed races
      const startIndex = Math.max(0, completedTracks.length - maxNumberOfRaces);
      return completedTracks.slice(startIndex);
    }
  }

  /**
   * Process driver data for Month view, calculating relative points from first race.
   */
  private processMonthPeriodDriverData(
    driverData: DriverDataMap, 
    numberOfCompletedRaces: number, 
    maxNumberOfRaces: number
  ): DriverDataMap {
    const processedData: DriverDataMap = {};
    let maxDriverValue = 0;
    
    for (const driver in driverData) {
      // Reverse to get chronological order (oldest to newest)
      const allData = driverData[driver].reverse();
      
      // Select data slice to show
      const dataToShow = this.selectDataSlice(allData, numberOfCompletedRaces, maxNumberOfRaces);
      
      // Calculate relative points from baseline (first value)
      const baselineValue = dataToShow.find(v => v !== null) ?? 0;
      const relativeData = dataToShow.map((value: number | null) => 
        value === null ? null : value - baselineValue
      );
      
      processedData[driver] = relativeData;
      
      // Track maximum value for chart scaling
      const driverMax = this.getMaxValue(relativeData);
      if (driverMax > maxDriverValue) 
        {maxDriverValue = driverMax;}
      
    }
    
    // Round chart scale up to nearest hundred
    this.chartScale = Math.ceil(maxDriverValue / SCALE_ROUNDING) * SCALE_ROUNDING;
    
    return processedData;
  }

  /**
   * Select appropriate data slice based on completed and requested races.
   */
  private selectDataSlice(
    allData: (number | null)[], 
    numberOfCompletedRaces: number, 
    maxNumberOfRaces: number
  ): (number | null)[] {
    if (numberOfCompletedRaces < maxNumberOfRaces) {
      // Pad with nulls for upcoming races
      const paddingNeeded = maxNumberOfRaces - numberOfCompletedRaces;
      const padding = new Array(paddingNeeded).fill(null);
      return [...allData, ...padding];
    } else 
      // Take last N races
      {return allData.slice(-maxNumberOfRaces);}
    
  }

  /**
   * Get maximum non-null value from an array.
   */
  private getMaxValue(data: (number | null)[]): number {
    const completedValues = data.filter((v): v is number => v !== null);
    return completedValues.length > 0 ? Math.max(...completedValues) : 0;
  }

  /**
   * Prepare data for the All period view (showing entire season).
   */
  private prepareAllPeriodData(
    numberOfCompletedRaces: number,
    uniqueDrivers: string[]
  ): { labels: string[], driverData: DriverDataMap } {
    const labels = this.championshipTracks.map(track => track.country);
    
    const driverData = this.groupDataByDriver();
    const processedDriverData = this.processAllPeriodDriverData(driverData, numberOfCompletedRaces);
    
    return { labels, driverData: processedDriverData };
  }

  /**
   * Process driver data for All view, padding with nulls for upcoming races.
   */
  private processAllPeriodDriverData(
    driverData: DriverDataMap, 
    numberOfCompletedRaces: number
  ): DriverDataMap {
    const processedData: DriverDataMap = {};
    const upcomingRacesCount = this.championshipTracks.length - numberOfCompletedRaces;
    const padding = new Array(upcomingRacesCount).fill(null);
    
    for (const driver in driverData) {
      // Reverse to get chronological order and pad for upcoming races
      const completedData = driverData[driver].reverse();
      processedData[driver] = [...completedData, ...padding];
    }
    
    // Calculate max value and set chart scale
    const maxTrendValue = Math.max(
      ...this.championshipTrend.map(item => Number(item.cumulative_points))
    );
    this.chartScale = Math.ceil(maxTrendValue / SCALE_ROUNDING) * SCALE_ROUNDING;
    
    return processedData;
  }

  /**
   * Update the main chart configuration with processed data.
   */
  private updateChartConfiguration(
    labels: string[], 
    driverData: DriverDataMap, 
    uniqueDrivers: string[]
  ): void {
    // Store driver data in mainChart for Chart.js consumption
    for (const driver of uniqueDrivers) 
      {this.mainChart[driver] = driverData[driver] || [];}
    
    
    const datasets = this.createDatasets(uniqueDrivers);
    const options = this.createChartOptions();
    
    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

  /**
   * Create Chart.js datasets for each driver.
   */
  private createDatasets(uniqueDrivers: string[]): ChartDataset[] {
    return uniqueDrivers.map((driverUsername, index) => {
      const color = DRIVER_COLORS[index % DRIVER_COLORS.length];
      
      return {
        data: this.mainChart[driverUsername] || [],
        label: driverUsername,
        backgroundColor: color,
        borderColor: color,
        pointHoverBackgroundColor: color,
        borderWidth: 2,
      };
    });
  }

  /**
   * Create Chart.js options configuration.
   */
  private createChartOptions(): ChartOptions {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const scales = this.getScales();
    const pointRadius = this.calculatePointRadius(screenWidth);
    
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales,
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: pointRadius.radius,
          hitRadius: pointRadius.hitRadius,
          hoverRadius: pointRadius.hoverRadius,
          hoverBorderWidth: pointRadius.hoverBorderWidth
        }
      }
    };
  }

  /**
   * Calculate responsive point sizes based on screen width.
   */
  private calculatePointRadius(screenWidth: number) {
    const baseSize = screenWidth > DESKTOP_BREAKPOINT ? DESKTOP_BREAKPOINT : screenWidth;
    
    return {
      radius: baseSize / 350,
      hitRadius: baseSize / 200,
      hoverRadius: baseSize / 250,
      hoverBorderWidth: baseSize / 300
    };
  }

  /**
   * Get Chart.js scale configuration for X and Y axes.
   */
  getScales(): ScaleOptions<any> {
    const colorBorderTranslucent = getStyle('--cui-border-color-translucent');
    const colorBody = getStyle('--cui-body-color');

    return {
      x: {
        grid: {
          color: colorBorderTranslucent,
          drawOnChartArea: false
        },
        ticks: {
          color: colorBody
        }
      },
      y: {
        border: {
          color: colorBorderTranslucent
        },
        grid: {
          color: colorBorderTranslucent
        },
        max: this.chartScale,
        beginAtZero: true,
        ticks: {
          color: colorBody,
          maxTicksLimit: 5,
          stepSize: Math.ceil(this.chartScale / 5)
        }
      }
    };
  }
}
