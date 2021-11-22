import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupsComponent } from './input-groups.component';

describe('InputGroupsComponent', () => {
  let component: InputGroupsComponent;
  let fixture: ComponentFixture<InputGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
