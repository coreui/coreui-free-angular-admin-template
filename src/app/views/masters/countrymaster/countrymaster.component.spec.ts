import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrymasterComponent } from './countrymaster.component';

describe('CountrymasterComponent', () => {
  let component: CountrymasterComponent;
  let fixture: ComponentFixture<CountrymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrymasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
