import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ButtonModule, DropdownModule, GridModule, WidgetModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { iconSubset } from '../../../icons/icon-subset';
import { WidgetsDropdownComponent } from './widgets-dropdown.component';

describe('WidgetsDropdownComponent', () => {
  let component: WidgetsDropdownComponent;
  let fixture: ComponentFixture<WidgetsDropdownComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetModule, DropdownModule, IconModule, ButtonModule, ChartjsModule, GridModule, WidgetsDropdownComponent],
      providers: [IconSetService, provideRouter([])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(WidgetsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
