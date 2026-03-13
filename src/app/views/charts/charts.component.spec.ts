import { describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
  });

  it('creates component instance', () => {
    expect(component).toBeTruthy();
  });

  it('renders component template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('handles component lifecycle hooks correctly', () => {
    expect(() => {
      fixture.detectChanges();
      fixture.destroy();
    }).not.toThrow();
  });
});
