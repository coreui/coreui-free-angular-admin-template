import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';
import { DashboardComponent } from './dashboard.component';

const settle = () => new Promise((resolve) => setTimeout(resolve));

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [IconSetService, provideRouter([])]
    }).compileComponents();

    TestBed.inject(IconSetService).icons = { ...iconSubset };

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(settle);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise the main chart', () => {
    expect(component.mainChart.type).toBe('line');
  });

  it('should switch the traffic period', () => {
    component.setTrafficPeriod('Year');
    expect(component.trafficRadioGroup.value.trafficRadio).toBe('Year');
  });

  it('should ignore an empty chart ref', () => {
    const chartRef = { options: {}, update: vi.fn(), stop: vi.fn() };
    component.handleChartRef(chartRef);
    component.handleChartRef(undefined);
    expect(component.mainChartRef()).toBe(chartRef);
  });

  it('should restyle the chart when the colour scheme changes', async () => {
    const chartRef = { options: {}, update: vi.fn(), stop: vi.fn() };
    component.handleChartRef(chartRef);
    await settle();
    chartRef.update.mockClear();

    document.documentElement.dispatchEvent(new Event('ColorSchemeChange'));
    await settle();

    expect(chartRef.update).toHaveBeenCalled();
  });
});
