import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { PilotCardComponent } from './pilot-card.component';

describe('PilotCardComponent', () => {
  let component: PilotCardComponent;
  let fixture: ComponentFixture<PilotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [PilotCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotCardComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('pilota', {
      driver_id: 1,
      driver_username: 'testdriver',
      driver_name: 'Test',
      driver_surname: 'Driver',
      driver_description: 'Test description',
      driver_license_pt: 3,
      driver_consistency_pt: 5,
      driver_fast_lap_pt: 4,
      drivers_dangerous_pt: 2,
      driver_ingenuity_pt: 3,
      driver_strategy_pt: 4,
      driver_color: '#FF0000',
      car_name: 'Test Car',
      car_overall_score: 85,
      total_sprint_points: 10,
      total_free_practice_points: 15,
      total_qualifying_points: 20,
      total_full_race_points: 25,
      total_race_points: 30,
      total_points: 100
    });
    fixture.componentRef.setInput('position', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
