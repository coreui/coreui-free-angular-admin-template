import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import type { DriverData, Driver, ChampionshipData, Season, CumulativePointsData, TrackData, User, RaceResult, ConstructorGrandPrixPoints, Constructor } from '@f123dashboard/shared';
import { GpResult } from '../model/championship';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  private apiService = inject(ApiService);

/****************************************************************/
//variabili locali
/****************************************************************/
  private allDriversSignal = signal<DriverData[]>([]);
  readonly allDrivers = this.allDriversSignal.asReadonly();

  private championshipSignal = signal<ChampionshipData[]>([]);
  readonly championship = this.championshipSignal.asReadonly();

  private cumulativePointsSignal = signal<CumulativePointsData[]>([]);
  readonly cumulativePoints = this.cumulativePointsSignal.asReadonly();

  private tracksSignal = signal<TrackData[]>([]);
  readonly tracks = this.tracksSignal.asReadonly();

  private raceResultSignal = signal<RaceResult[]>([]);
  readonly raceResult = this.raceResultSignal.asReadonly();

  private usersSignal = signal<User[]>([]);
  readonly users = this.usersSignal.asReadonly();

  private driversSignal = signal<Driver[]>([]);
  readonly drivers = this.driversSignal.asReadonly();

  private constructorGrandPrixPointsSignal = signal<ConstructorGrandPrixPoints[]>([]);
  readonly constructorGrandPrixPoints = this.constructorGrandPrixPointsSignal.asReadonly();

  private constructorsSignal = signal<Constructor[]>([]);
  readonly constructors = computed(() => {
    const constructors = this.constructorsSignal();
    // TODO fix hardcoded drivers in constructors
    return constructors.map(constructor => {
      const updated = { ...constructor };
      if (constructor.constructor_id === 1) {
        updated.driver_1_id = 10;
        updated.driver_1_username = "Marcogang96";
        updated.driver_2_id = 11;
        updated.driver_2_username = "GiannisCorbe";
      } else if (constructor.constructor_id === 4) {
        updated.driver_1_id = 14;
        updated.driver_1_username = "redmamba_99_";
        updated.driver_2_id = 16;
        updated.driver_2_username = "JJKudos";
      } else if (constructor.constructor_id === 2) {
        updated.driver_1_id = 12;
        updated.driver_1_username = "Lil Mvrck";
        updated.driver_2_id = 17;
        updated.driver_2_username = "Octimus10";
      } else if (constructor.constructor_id === 3) {
        updated.driver_1_id = 13;
        updated.driver_1_username = "FASTman";
        updated.driver_2_id = 15;
        updated.driver_2_username = "Dreandos";
      }
      return updated;
    });
  });

  readonly winningConstructorGrandPrixPoints = computed(() => {
    const allConstructorGpPoints = this.constructorGrandPrixPoints();
    const winningConstructorsByRace = new Map<number, ConstructorGrandPrixPoints>();
    
    allConstructorGpPoints.forEach(entry => {
      const existingWinner = winningConstructorsByRace.get(entry.grand_prix_id);
      if (!existingWinner || entry.constructor_points > existingWinner.constructor_points) {
        winningConstructorsByRace.set(entry.grand_prix_id, entry);
      }
    });
    
    return Array.from(winningConstructorsByRace.values())
      .sort((a, b) => new Date(a.grand_prix_date).getTime() - new Date(b.grand_prix_date).getTime());
  });


/****************************************************************/
//compilazione delle variabili pre caricamento del interfaccia web 
/****************************************************************/

  async allData() {
    const {
      allDrivers,
      championship,
      cumulativePoints,
      tracks,
      users,
      raceResult,
      constructors,
      drivers,
      constructorGrandPrixPoints
    } = await firstValueFrom(forkJoin({
      allDrivers: this.apiService.post<DriverData[]>('/database/drivers', {}),
      championship: this.apiService.post<ChampionshipData[]>('/database/championship', {}),
      cumulativePoints: this.apiService.post<CumulativePointsData[]>('/database/cumulative-points', {}),
      tracks: this.apiService.post<TrackData[]>('/database/tracks', {}),
      users: this.apiService.post<User[]>('/auth/users', {}),
      raceResult: this.apiService.post<RaceResult[]>('/database/race-results', {}),
      constructors: this.apiService.post<Constructor[]>('/database/constructors', {}),
      drivers: this.apiService.post<Driver[]>('/database/drivers-data', {}),
      constructorGrandPrixPoints: this.apiService.post<ConstructorGrandPrixPoints[]>('/database/constructor-grand-prix-points', {})
    }));

    this.allDriversSignal.set(allDrivers);
    this.championshipSignal.set(championship);
    this.cumulativePointsSignal.set(cumulativePoints);
    this.tracksSignal.set(tracks);
    this.usersSignal.set(users);
    this.raceResultSignal.set(raceResult);
    this.constructorsSignal.set(constructors);
    this.driversSignal.set(drivers);
    this.constructorGrandPrixPointsSignal.set(constructorGrandPrixPoints);
  }

/****************************************************************/
//season-specific data methods
/****************************************************************/

  async getDriversBySeason(seasonId?: number): Promise<DriverData[]> {
    const drivers = await firstValueFrom(
      this.apiService.post<DriverData[]>('/database/drivers', { seasonId })
    );
    return drivers;
  }

  async getDriversData(seasonId?: number): Promise<Driver[]> {
    const drivers = await firstValueFrom(
      this.apiService.post<Driver[]>('/database/drivers-data', { seasonId })
    );
    return drivers;
  }

  async getChampionshipBySeason(seasonId?: number): Promise<ChampionshipData[]> {
    const championship = await firstValueFrom(
      this.apiService.post<ChampionshipData[]>('/database/championship', { seasonId })
    );
    return championship;
  }

  async getCumulativePointsBySeason(seasonId?: number): Promise<CumulativePointsData[]> {
    const cumulativePoints = await firstValueFrom(
      this.apiService.post<CumulativePointsData[]>('/database/cumulative-points', { seasonId })
    );
    return cumulativePoints;
  }

  async getAllTracksBySeason(seasonId?: number): Promise<TrackData[]> {
    const tracks = await firstValueFrom(
      this.apiService.post<TrackData[]>('/database/tracks', { seasonId })
    );
    return tracks;
  }

  async getRaceResultBySeason(seasonId?: number): Promise<RaceResult[]> {
    const raceResult = await firstValueFrom(
      this.apiService.post<RaceResult[]>('/database/race-results', { seasonId })
    );
    return raceResult;
  }

  async getAllSeasons(): Promise<Season[]> {
    const seasons = await firstValueFrom(
      this.apiService.post<Season[]>('/database/seasons', {})
    );
    return seasons;
  }

  async getConstructorsBySeason(seasonId?: number): Promise<Constructor[]> {
    const constructors = await firstValueFrom(
      this.apiService.post<Constructor[]>('/database/constructors', { seasonId })
    );
    return constructors;
  }

  async getConstructorGrandPrixPoints(seasonId?: number): Promise<ConstructorGrandPrixPoints[]> {
    const constructorGpPoints = await firstValueFrom(
      this.apiService.post<ConstructorGrandPrixPoints[]>('/database/constructor-grand-prix-points', { seasonId })
    );
    return constructorGpPoints;
  }

  async setGpResult(trackId: number, gpResult: GpResult): Promise<string> {
    try {
      const result = await firstValueFrom(
        this.apiService.post<string>('/database/set-gp-result', {
          trackId: +trackId,
          hasSprint: gpResult.hasSprint,
          raceResult: gpResult.raceResult,
          raceDnfResult: gpResult.raceDnfResult,
          sprintResult: gpResult.sprintResult,
          sprintDnfResult: gpResult.sprintDnfResult,
          qualiResult: gpResult.qualiResult,
          fpResult: gpResult.fpResult,
          seasonId: gpResult.seasonId
        })
      );
      return result;
    } catch (error) {
      console.error('Error setting GP result:', error);
      throw new Error(`Failed to set GP result: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getAvatarSrc(user: User | null): string {
    if (user?.image) {
      // Handle case where image might be a Buffer or other non-string type
      const image = user.image as any; // Type assertion since image can be Buffer from DB
      let imageStr: string;
      
      if (typeof image === 'string') {
        imageStr = image;
      } else if (image instanceof ArrayBuffer || image instanceof Uint8Array) {
        // Convert Buffer/ArrayBuffer to base64 string
        const bytes = new Uint8Array(image);
        imageStr = btoa(String.fromCharCode(...bytes));
      } else if (image && typeof image === 'object' && 'data' in image) {
        // Handle Buffer-like object with data property
        const bytes = new Uint8Array(image.data);
        imageStr = btoa(String.fromCharCode(...bytes));
      } else {
        // Try to convert to string
        imageStr = String(image);
      }
      
      // Check if it's already a data URL (base64)
      if (imageStr.startsWith('data:')) {
        return imageStr;
      }
      // If it's base64 without data URL prefix, add it
      return `data:image/jpeg;base64,${imageStr}`;
    }
    // Fallback to file path
    return `./assets/images/avatars_fanta/${user?.id || 'default'}.png`;
  }

}
