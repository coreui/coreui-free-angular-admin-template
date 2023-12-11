import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawListComponent } from './withdraw-list.component';

describe('WithdrawListComponent', () => {
  let component: WithdrawListComponent;
  let fixture: ComponentFixture<WithdrawListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
