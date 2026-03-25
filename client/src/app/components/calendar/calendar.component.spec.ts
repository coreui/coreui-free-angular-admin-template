import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar.component';
import { DatePipe } from '@angular/common';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [provideNoopAnimations(), DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to week view', () => {
    expect(component.view()).toBe('week');
  });

  it('should switch views', () => {
    component.setView('month');
    expect(component.view()).toBe('month');
    component.setView('week');
    expect(component.view()).toBe('week');
  });

  it('should take input for default view', () => {
    fixture.componentRef.setInput('defaultView', 'month');
    fixture.detectChanges();
    expect(component.view()).toBe('month');
  });

  it('should navigate dates correctly in week view', () => {
    const initial = new Date(component.currentDate());
    
    // Next Week
    component.next();
    let current = component.currentDate();
    let diffDays = (current.getTime() - initial.getTime()) / (1000 * 3600 * 24);
    expect(diffDays).toBeCloseTo(7);

    // Prev Week (back to start)
    component.prev();
    current = component.currentDate();
    diffDays = (current.getTime() - initial.getTime()) / (1000 * 3600 * 24);
    expect(diffDays).toBeCloseTo(0);
  });

  it('should navigate dates correctly in month view', () => {
    component.setView('month');
    const initial = new Date(component.currentDate());
    
    // Next Month
    component.next();
    const current = component.currentDate();
    // Rough check: month should be different
    expect(current.getMonth()).not.toBe(initial.getMonth());
    
    // Check specific month diff logic (approx 28-31 days)
    // Or check getMonth() increased by 1 (wrapping around year)
    const expectedMonth = (initial.getMonth() + 1) % 12;
    expect(current.getMonth()).toBe(expectedMonth);
  });

  it('should process events correctly', () => {
    // Recreate the component with events already set before initialization
    const testDate = new Date();
    testDate.setHours(10, 0, 0, 0);
    
    const newFixture = TestBed.createComponent(CalendarComponent);
    const newComponent = newFixture.componentInstance;
    
    // Set events before change detection runs
    newFixture.componentRef.setInput('events', [
      { name: 'Test Event', date: testDate, description: 'Desc' }
    ]);
    
    // Now run change detection
    newFixture.detectChanges();
    
    const events = newComponent.processedEvents();
    expect(events.length).toBe(1);
    expect(events[0].name).toBe('Test Event');
    
    // Check slot mapping
    const slotEvents = newComponent.getEventsForSlot(testDate, 10);
    expect(slotEvents.length).toBe(1);
    
    const wrongSlotEvents = newComponent.getEventsForSlot(testDate, 11);
    expect(wrongSlotEvents.length).toBe(0);
  });
});
