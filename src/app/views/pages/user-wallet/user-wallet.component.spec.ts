import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWalletComponent } from './user-wallet.component';

describe('UserWalletComponent', () => {
  let component: UserWalletComponent;
  let fixture: ComponentFixture<UserWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
