import { Component, OnInit, DestroyRef, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import {
  CardBodyComponent,
  CardComponent} from '@coreui/angular';
import {DbDataService} from '../../service/db-data.service';
import type { TrackData } from '@f123dashboard/shared';

interface TimeInterface {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
    selector: 'app-countdown',
    imports: [
        CommonModule,
        CardComponent, CardBodyComponent
    ],
    templateUrl: './countdown.component.html',
    styleUrl: './countdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent implements OnInit {
  private dbData = inject(DbDataService);
  private destroyRef = inject(DestroyRef);

  public championshipNextTracks: TrackData[] = [];

  // countdown variables
  targetDate = signal<Date | undefined>(undefined);
  timeRemaining = signal<TimeInterface>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  ngOnInit(): void {
    // countdown to next gp
    this.championshipNextTracks = this.dbData.tracks();
    
    // filter next championship track
    const currentDate = new Date();
    const nextDate = this.championshipNextTracks
      .map(track => new Date(track.date))
      .sort((a, b) => a.getTime() - b.getTime())
      .find(dbDate => dbDate >= currentDate);

    if (nextDate) {
      this.targetDate.set(nextDate);
      this.startCountdown();
    }
  }

  startCountdown(): void {
    const timer = setInterval(() => {
      const target = this.targetDate();
      if (!target) {
        return;
      }

      const now = new Date().getTime();
      const distance = target.getTime() - now;

      // Calculate time remaining in days, hours, minutes, seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timeRemaining.set({
        days,
        hours,
        minutes,
        seconds
      });

      // If the countdown is over, clear the interval
      if (distance < 0) {
        clearInterval(timer);
        this.timeRemaining.set({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    }, 1000); // Update every second for more accurate countdown

    // Register cleanup
    this.destroyRef.onDestroy(() => {
      clearInterval(timer);
    });
  }
}
