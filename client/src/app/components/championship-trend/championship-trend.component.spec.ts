import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ChampionshipTrendComponent } from './championship-trend.component';

describe('ChampionshipTrendComponent', () => {
  let component: ChampionshipTrendComponent;
  let fixture: ComponentFixture<ChampionshipTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [ChampionshipTrendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionshipTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
