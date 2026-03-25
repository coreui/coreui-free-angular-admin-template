import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { RegoleComponent } from './regole.component';

describe('RegoleComponent', () => {
  let component: RegoleComponent;
  let fixture: ComponentFixture<RegoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [RegoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
