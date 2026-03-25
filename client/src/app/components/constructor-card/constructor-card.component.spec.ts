import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ConstructorCardComponent } from './constructor-card.component';

describe('ConstructorCardComponent', () => {
  let component: ConstructorCardComponent;
  let fixture: ComponentFixture<ConstructorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [ConstructorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructorCardComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('constructorData', {
      constructor_id: 1,
      constructor_name: 'Test Constructor',
      constructor_color: '#FF0000',
      driver_1_id: 1,
      driver_1_username: 'driver1',
      driver_1_tot_points: 100,
      driver_2_id: 2,
      driver_2_username: 'driver2',
      driver_2_tot_points: 90,
      constructor_tot_points: 190
    });
    fixture.componentRef.setInput('position', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
