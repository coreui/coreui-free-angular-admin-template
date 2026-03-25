import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { FantaDashboardComponent } from './fanta-dashboard.component';

describe('FantaDashboardComponent', () => {
  let component: FantaDashboardComponent;
  let fixture: ComponentFixture<FantaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [FantaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FantaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
