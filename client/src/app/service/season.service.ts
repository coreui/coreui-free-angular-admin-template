import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { Season } from '@f123dashboard/shared';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private apiService = inject(ApiService);
  private allSesons: Season[] = [];
  private currentSeasonSignal = signal<Season>(null!);
  public readonly season = this.currentSeasonSignal.asReadonly();
  

  setCurreentSeason(season: Season) {
    this.currentSeasonSignal.set(season);
  }
  getCurrentSeason(): Season {
    return this.currentSeasonSignal();
  }

  public getAllSeasons(): Season[] {
    return this.allSesons;
  }

  public setAllSeasons() {
    firstValueFrom(
      this.apiService.post<Season[]>('/database/seasons', {})
    ).then((seasons: Season[]) => {
      if (seasons.length === 0) {
        console.error("No seasons found in the database.");
        return;
      }
      this.allSesons = seasons;
      const latestSeason = this.allSesons.reduce((latest, current) =>
        latest?.startDate && current?.startDate && latest.startDate > current.startDate ? latest : current
        , this.allSesons[0]
      );
      this.setCurreentSeason(latestSeason);
    }).catch((error: unknown) => {
      console.error("Error fetching seasons:", error);
    });
  }

}