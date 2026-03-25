import { Component, input, computed, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule, ButtonGroupModule, ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

export interface CalendarEvent {
  name: string;
  date: Date | string; // Support both object and ISO string
  description?: string;
  color?: string; // Optional color for the event
}

export interface ProcessedCalendarEvent extends CalendarEvent {
  parsedDate: Date;
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, ButtonModule, ButtonGroupModule, IconModule, ModalModule],
  providers: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * A calendar component that displays events in week or month view.
 * Supports navigation, event selection, and modal display.
 */
export class CalendarComponent {
  /**
   * The title displayed at the top of the calendar.
   * @default 'Calendar'
   */
  title = input<string>('Calendar'); 
 
  /**
   * The default view mode for the calendar.
   * Can be either 'week', 'month', or 'list'.
   * @default 'week'
   */
  defaultView = input<'week' | 'month' | 'list'>('week'); 
 
  /**
   * An array of calendar events to be displayed.
   * Each event should conform to the CalendarEvent interface.
   * @default []
   */
  events = input<CalendarEvent[]>([]);

  /**
   * If true, forces the mobile list view on all screen sizes for the week view.
   * @default false
   */
  compactView = input<boolean>(false);



  readonly view = signal<'week' | 'month' | 'list'>('week');
  readonly currentDate = signal<Date>(new Date());
  readonly listPage = signal<number>(0);
  readonly hours = Array.from({ length: 24 }, (_, i) => i);
  // Modal state
  readonly selectedEvent = signal<ProcessedCalendarEvent | null>(null);
  readonly eventModalVisible = signal(false);

  // Locale for formatting (Italian as requested in examples)
  private readonly locale = 'it-IT';

  constructor() {
    // Sync view with defaultView input using effect
    effect(() => {
      const newDefaultView = this.defaultView();
      this.view.set(newDefaultView);
      
      // If switching to list view, calculate the appropriate page
      if (newDefaultView === 'list') {
        this.calculateListPageForDate(this.currentDate());
      }
    });

    // Watch events changes - if events are loaded and in list view, sync to today
    effect(() => {
      const currentEvents = this.events();
      if (this.view() === 'list' && currentEvents.length > 0) {
        this.calculateListPageForDate(this.currentDate());
      }
    });
  }


  readonly currentLabel = computed(() => {
    const date = this.currentDate();
    const view = this.view();
    
    if (view === 'month') {
      // e.g., Set 2026
      return date.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' });
    } else if (view === 'week') {
      // Week View: Show range or current month
      // e.g., 26 Gen - 01 Feb 2026
      const start = this.getStartOfWeek(date);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      
      const startStr = start.toLocaleDateString(this.locale, { day: 'numeric', month: 'short' });
      const endStr = end.toLocaleDateString(this.locale, { day: 'numeric', month: 'short', year: 'numeric' });
      return `${startStr} - ${endStr}`;
    } else {
      // List View: Show range of events on current page
      const visibleDays = this.visibleListDays();
      if (visibleDays.length === 0) {
        return 'Nessun Evento';
      }
      
      const start = visibleDays[0].date;
      const end = visibleDays[visibleDays.length - 1].date;
      
      const startStr = start.toLocaleDateString(this.locale, { day: 'numeric', month: 'short' });
      const endStr = end.toLocaleDateString(this.locale, { day: 'numeric', month: 'short', year: 'numeric' });
      return `Eventi: ${startStr} - ${endStr}`;
    }
  });

  readonly sortedUniqueEventDates = computed(() => {
    const events = this.processedEvents();
    const dates = new Set<number>();
    events.forEach(e => {
      const d = new Date(e.parsedDate);
      d.setHours(0, 0, 0, 0);
      dates.add(d.getTime());
    });
    return Array.from(dates).sort((a, b) => a - b).map(t => new Date(t));
  });

  readonly visibleListDays = computed(() => {
    const allDates = this.sortedUniqueEventDates();
    const page = this.listPage();
    const pageSize = 7;
    
    // Ensure page valid
    const startIndex = page * pageSize;
    
    return allDates.slice(startIndex, startIndex + pageSize).map(d => ({
      date: d,
      label: d.toLocaleDateString(this.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      isToday: this.isSameDay(d, new Date())
    }));
  });

  readonly weekDays = computed(() => {
    const start = this.getStartOfWeek(this.currentDate());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return {
        date: d,
        label: d.toLocaleDateString(this.locale, { weekday: 'long', day: 'numeric' }), // Lunedì 11
        isToday: this.isSameDay(d, new Date())
      };
    });
  });

  readonly weekHeaders = computed(() => {
    // Generate headers Lun...Dom for month view
    // Use a fixed date that is a Monday to start (e.g., Jan 1 2024 is a Monday)
    const baseDate = new Date(2024, 0, 1); 
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      return d.toLocaleDateString(this.locale, { weekday: 'long' });
    });
  });

  readonly monthgrid = computed(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDate = this.getStartOfWeek(firstDayOfMonth);

    const weeks = [];
    const currentDay = new Date(startDate);

    // Generate 6 weeks to cover all possible month overlaps (max 42 days)
    for (let w = 0; w < 6; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        week.push({
          date: new Date(currentDay),
          dayNumber: currentDay.getDate(),
          isCurrentMonth: currentDay.getMonth() === month,
          isToday: this.isSameDay(currentDay, new Date())
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
      
      // Stop if we've moved to the next month and completed the week
      if (currentDay.getMonth() !== month && w >= 4) {
        break;
      }
    }
    return weeks;
  });

  readonly processedEvents = computed(() => {
    // Map events to easy lookup structure
    return this.events().map(e => ({
      ...e,
      parsedDate: this.parseAsLocalTime(e.date)
    }));
  });

  // --- Navigation Methods ---

  setView(view: 'week' | 'month' | 'list') {
    this.view.set(view);
    if (view === 'list') {
      this.calculateListPageForDate(this.currentDate());
    }
  }

  next() {
    if (this.view() === 'list') {
      const allDates = this.sortedUniqueEventDates();
      const maxPage = Math.ceil(allDates.length / 7) - 1;
      if (this.listPage() < maxPage) {
        this.listPage.update(p => p + 1);
      }
      return;
    }

    const date = new Date(this.currentDate());
    if (this.view() === 'week') {
      date.setDate(date.getDate() + 7);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    this.currentDate.set(date);
  }

  prev() {
    if (this.view() === 'list') {
      if (this.listPage() > 0) {
        this.listPage.update(p => p - 1);
      }
      return;
    }

    const date = new Date(this.currentDate());
    if (this.view() === 'week') {
      date.setDate(date.getDate() - 7);
    } else {
      date.setMonth(date.getMonth() - 1);
    }
    this.currentDate.set(date);
  }

  today() {
    this.currentDate.set(new Date());
    if (this.view() === 'list') {
      this.calculateListPageForDate(new Date());
    }
  }
  
  private calculateListPageForDate(date: Date) {
    const allDates = this.sortedUniqueEventDates();
    if (allDates.length === 0) {
      this.listPage.set(0);
      return;
    }
    
    // Find the first date >= given date
    const targetTime = new Date(date);
    targetTime.setHours(0,0,0,0);
    const targetTs = targetTime.getTime();
    
    let index = allDates.findIndex(d => d.getTime() >= targetTs);
    
    // If not found (all events are in past), show last page? Or closest?
    // Let's default to closest (last one if all past)
    if (index === -1) {
       index = allDates.length - 1; 
       // If empty handled above
    }
    
    this.listPage.set(Math.floor(index / 7));
  }

  // --- Modal Methods ---
  
  handleEventClick(event: ProcessedCalendarEvent) {
    this.selectedEvent.set(event);
    this.eventModalVisible.set(true);
  }

  handleModalChange(visible: boolean) {
    this.eventModalVisible.set(visible);
    if (!visible) {
      // Optional: delay clearing to avoid content flash during animation
      setTimeout(() => this.selectedEvent.set(null), 300);
    }
  }

  // --- Helper Methods ---

  /**
   * Parse a date/string as local time, ignoring timezone indicators.
   * This prevents ISO strings with 'Z' from being converted to local timezone.
   */
  private parseAsLocalTime(date: Date | string): Date {
    if (date instanceof Date) {
      return date;
    }
    
    // Parse ISO string components and create local date
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/);
    if (match) {
      const [, year, month, day, hour = '0', minute = '0', second = '0'] = match;
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      );
    }
    
    // Fallback to standard parsing
    return new Date(date);
  }

  private getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  getEventsForSlot(date: Date, hour?: number): ProcessedCalendarEvent[] {
    return this.processedEvents().filter(e => {
      const isSameDay = this.isSameDay(e.parsedDate, date);
      if (!isSameDay) {return false;}
      
      if (hour !== undefined) {
        return e.parsedDate.getHours() === hour;
      }
      return true;
    });
  }
}
