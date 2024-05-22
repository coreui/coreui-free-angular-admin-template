import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms'; // Importa los módulos que UsersComponent utiliza, como FormsModule, ReactiveFormsModule, etc.

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Agrega aquí los módulos que utiliza UsersComponent
      declarations: [UsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
