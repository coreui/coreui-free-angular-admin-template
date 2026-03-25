import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PodiumCardComponent } from './podium-card.component';

describe('PodiumCardComponent', () => {
  let component: PodiumCardComponent;
  let fixture: ComponentFixture<PodiumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [PodiumCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodiumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
