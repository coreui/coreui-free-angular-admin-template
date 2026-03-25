import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AlboDOroComponent } from './albo-d-oro.component';

describe('AlboDOroComponent', () => {
  let component: AlboDOroComponent;
  let fixture: ComponentFixture<AlboDOroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
      imports: [AlboDOroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlboDOroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
