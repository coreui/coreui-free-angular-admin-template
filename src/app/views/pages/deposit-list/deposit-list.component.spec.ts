import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositListComponent } from './deposit-list.component';

describe('DepositListComponent', () => {
  let component: DepositListComponent;
  let fixture: ComponentFixture<DepositListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
