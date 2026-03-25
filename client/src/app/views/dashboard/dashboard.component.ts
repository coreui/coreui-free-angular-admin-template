import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {DbDataService} from '../../service/db-data.service';
import { ConstructorService } from '../../service/constructor.service';
import { ModalModule } from '@coreui/angular';
import {
  AvatarComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  BadgeComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
  Tabs2Module,
  ButtonCloseDirective
} from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { cilCalendar, cilMap, cilFire } from '@coreui/icons';
import { LeaderboardComponent } from "../../components/leaderboard/leaderboard.component";
import { TwitchApiService } from '../../service/twitch-api.service';
import { LoadingService } from '../../service/loading.service';
import { ChampionshipTrendComponent } from '../../components/championship-trend/championship-trend.component';
import type { Constructor, CumulativePointsData, DriverData, TrackData } from '@f123dashboard/shared';
import { PilotCardComponent } from '../../components/pilot-card/pilot-card.component';
import { ConstructorCardComponent } from '../../components/constructor-card/constructor-card.component';
import { CalendarComponent, CalendarEvent } from '../../components/calendar/calendar.component';
import type { DriverOfWeek, ConstructorOfWeek } from '../../model/dashboard.model';
import { allFlags } from '../../model/constants';

export interface DriverDataWithGainedPoints extends DriverData {
  gainedPoints: number;
  deltaPoints?: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    LeaderboardComponent,
    ModalModule,
    BadgeComponent,
    ThemeDirective,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink,
    CommonModule,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    IconDirective,
    ReactiveFormsModule,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    ChampionshipTrendComponent,
    Tabs2Module,
    PilotCardComponent,
    ButtonCloseDirective,
    ConstructorCardComponent,
    CalendarComponent
]
})
export class DashboardComponent implements OnInit {
  private dbData = inject(DbDataService);
  private twitchApiService = inject(TwitchApiService);
  private sanitizer = inject(DomSanitizer);
  private constructorService = inject(ConstructorService);
  loadingService = inject(LoadingService);

  private screenWidth = signal<number>(0);
  showColumn = computed(() => this.screenWidth() > 1600);

  twitchEmbedUrl = signal<SafeResourceUrl>('' as SafeResourceUrl);
  calendarEvents = signal<CalendarEvent[]>([]);

  championship_standings_users = signal<DriverDataWithGainedPoints[]>([]);
  championshipTracks = signal<TrackData[]>([]);
  championshipNextTracks = signal<TrackData[]>([]);
  isLive = signal<boolean>(true);
  constructors = signal<Constructor[]>([]);
  showGainedPointsColumn = signal<boolean>(false);
  driverOfWeek = signal<DriverOfWeek>({ driver_username: '', driver_id: 0, points: 0 });
  constructorOfWeek = signal<ConstructorOfWeek>({ 
    constructor_name: '', 
    constructor_id: 0,
    constructor_driver_1_id: 0, 
    constructor_driver_2_id: 0, 
    points: 0 
  });

  pilotModalVisible = signal<boolean>(false);
  selectedPilot = signal<DriverData | null>(null);
  selectedPilotPosition = signal<number>(0);

  constructorModalVisible = signal<boolean>(false);
  selectedConstructor = signal<Constructor | null>(null);
  selectedConstructorPosition = signal<number>(0);

  resoultModalVisible = signal<number>(0);

  private constructorMap = computed(() => {
    const map = new Map<string, string>();
    this.constructors().forEach(c => {
      if (c.driver_1_username) map.set(c.driver_1_username, c.constructor_name);
      if (c.driver_2_username) map.set(c.driver_2_username, c.constructor_name);
    });
    return map;
  });

  readonly allFlags = allFlags;
  public calendarIcon: string[] = cilCalendar;
  public mapIcon: string[] = cilMap;
  public fireIcon: string[] = cilFire;

  constructor() { 
      this.screenWidth.set(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  }

  toggleResoultModalvisible(modal: number): void {
    this.resoultModalVisible.set(modal);
  }

  ngOnInit(): void {
    this.initializeTwitchEmbed();
    this.initializeDriversData();
    this.initializeTracksAndCalendar();
    this.initializeConstructorsData();
    this.calculateNextTracks();
    
    const championshipTrend = this.getChampionshipTrend();
    this.calculateDriverGainedPoints(championshipTrend);
    this.calculateConstructorGainedPoints();
    this.calculateDriverDeltaPoints();
    this.calculateWeeklyBestPerformers(championshipTrend);
  }

  /**
   * Initializes Twitch embed URL if stream is live
   */
  private initializeTwitchEmbed(): void {
    this.isLive.set(this.twitchApiService.isLive());
    if (this.isLive()) {
      const currentHostname = window.location.hostname;
      const twitchUrl = `https://player.twitch.tv/?channel=${this.twitchApiService.getChannel()}&parent=${currentHostname}&autoplay=false&muted=false&time=0s`;
      this.twitchEmbedUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(twitchUrl));
    }
  }

  /**
   * Initializes drivers data with gained points initialized to 0
   */
  private initializeDriversData(): void {
    this.championship_standings_users.set(this.dbData.allDrivers().map(driver => ({
      ...driver,
      gainedPoints: 0
    })));
  }

  /**
   * Gets championship trend data sorted by date
   */
  private getChampionshipTrend(): CumulativePointsData[] {
    return this.dbData.cumulativePoints()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Initializes tracks data and maps them to calendar events
   */
  private initializeTracksAndCalendar(): void {
    this.championshipTracks.set(this.dbData.tracks());
    this.calendarEvents.set(this.mapTracksToCalendarEvents(this.championshipTracks()));
  }

  /**
   * Maps track data to calendar event format
   */
  private mapTracksToCalendarEvents(tracks: TrackData[]): CalendarEvent[] {
    return tracks.map(track => {
      let desc = `Paese: ${track.country}`;
      if (track.has_sprint === 1) {
        desc += '\n• Sprint Race';
      }
      if (track.has_x2 === 1) {
        desc += '\n• Punti Doppi (x2)';
      }
      
      return {
        name: track.name,
        date: track.date,
        description: desc
      };
    });
  }

  /**
   * Initializes constructors data and calculates their points
   */
  private initializeConstructorsData(): void {
    const allConstructors = this.dbData.constructors();
    const updatedConstructors = this.constructorService.calculateConstructorPoints(
      allConstructors, 
      this.championship_standings_users()
    );
    this.constructors.set(updatedConstructors);
  }

  /**
   * Filters and formats the next 2 upcoming championship tracks
   */
  private calculateNextTracks(): void {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const nextTracks = this.championshipTracks()
      .map(track => {
        const dbDate = new Date(track.date);
        dbDate.setHours(0, 0, 0, 0);
        return { ...track, date: dbDate, dbDate };
      })
      .filter(track => track.dbDate >= currentDate)
      .slice(0, 2)
      .map(track => ({
        ...track,
        date: track.dbDate.toLocaleDateString("it-CH")
      }));
    
    this.championshipNextTracks.set(nextTracks);
  }

  /**
   * Calculates gained points for drivers over the last 2 tracks
   */
  private calculateDriverGainedPoints(championshipTrend: CumulativePointsData[]): void {
    const users = this.championship_standings_users();
    let hasGainedPoints = false;
    
    for (const user of users) {
      const userTracks = championshipTrend.filter(
        (track: CumulativePointsData) => track.driver_username === user.driver_username
      );
      
      if (userTracks.length > 2) {
        const lastPoints = userTracks[0].cumulative_points;
        const thirdToLastPoints = userTracks[2].cumulative_points;
        user.gainedPoints = lastPoints - thirdToLastPoints;
        hasGainedPoints = true;
      } else {
        user.gainedPoints = 0;
      }
    }
    
    this.championship_standings_users.set([...users]);
    this.showGainedPointsColumn.set(hasGainedPoints);
  }

  /**
   * Calculates gained points for constructors
   */
  private calculateConstructorGainedPoints(): void {
    const updatedConstructors = this.constructorService.calculateConstructorGainedPoints(
      this.constructors(), 
      this.championship_standings_users()
    );
    this.constructors.set(updatedConstructors);
  }

  /**
   * Calculates delta points between consecutive drivers in standings
   */
  private calculateDriverDeltaPoints(): void {
    const users = this.championship_standings_users();
    
    for (let i = 1; i < users.length; i++) {
      users[i].deltaPoints = users[i - 1].total_points - users[i].total_points;
    }
    
    this.championship_standings_users.set([...users]);
  }

  /**
   * Calculates the best performing driver and constructor of the week
   */
  private calculateWeeklyBestPerformers(championshipTrend: CumulativePointsData[]): void {
    const driversCount = this.championship_standings_users().length;
    
    if (championshipTrend.length <= 3 * driversCount) {
      return;
    }

    const lastRacePoints = championshipTrend.slice(0, driversCount);
    const thirdLastRacePoints = championshipTrend.slice(2 * driversCount, 3 * driversCount);

    this.calculateDriverOfWeek(lastRacePoints, thirdLastRacePoints);
    this.calculateConstructorOfWeek(lastRacePoints, thirdLastRacePoints);
  }

  /**
   * Finds the driver with the most points gained in the last 2 races
   */
  private calculateDriverOfWeek(
    lastRacePoints: CumulativePointsData[],
    thirdLastRacePoints: CumulativePointsData[]
  ): void {
    let bestPoints = 0;
    let bestDriver: DriverOfWeek = { driver_username: '', driver_id: 0, points: 0 };

    for (let i = 0; i < lastRacePoints.length; i++) {
      const currentPoints = Number(lastRacePoints[i].cumulative_points) - 
                           Number(thirdLastRacePoints[i].cumulative_points);
      
      if (currentPoints > bestPoints) {
        bestPoints = currentPoints;
        bestDriver = {
          driver_username: lastRacePoints[i].driver_username,
          driver_id: Number(lastRacePoints[i].driver_id),
          points: currentPoints
        };
      }
    }
    
    this.driverOfWeek.set(bestDriver);
  }

  /**
   * Finds the constructor with the most combined driver points in the last 2 races
   */
  private calculateConstructorOfWeek(
    lastRacePoints: CumulativePointsData[],
    thirdLastRacePoints: CumulativePointsData[]
  ): void {
    const constructorsOfWeek: ConstructorOfWeek[] = this.constructors().map(constructor => ({
      constructor_name: constructor.constructor_name,
      constructor_id: constructor.constructor_id,
      constructor_driver_1_id: constructor.driver_1_id,
      constructor_driver_2_id: constructor.driver_2_id,
      points: 0
    }));

    for (let i = 0; i < lastRacePoints.length; i++) {
      const currentPoints = Number(lastRacePoints[i].cumulative_points) - 
                           Number(thirdLastRacePoints[i].cumulative_points);
      
      constructorsOfWeek.forEach(constructor => {
        const driverId = Number(lastRacePoints[i].driver_id);
        if (constructor.constructor_driver_1_id === driverId || 
            constructor.constructor_driver_2_id === driverId) {
          constructor.points += currentPoints;
        }
      });
    }

    const sortedConstructors = constructorsOfWeek.sort((a, b) => b.points - a.points);
    if (sortedConstructors.length > 0) {
      this.constructorOfWeek.set(sortedConstructors[0]);
    }
  }

  /**
   * Opens the pilot modal with the selected pilot data
   */
  openPilotModal(pilot: DriverData, position: number): void {
    this.selectedPilot.set(pilot);
    this.selectedPilotPosition.set(position);
    this.pilotModalVisible.set(true);
  }

  /**
   * Closes the pilot modal
   */
  closePilotModal(): void {
    this.pilotModalVisible.set(false);
    this.selectedPilot.set(null);
    this.selectedPilotPosition.set(0);
  }

  /**
   * Opens the constructor modal with the selected constructor data
   */
  openConstructorModal(constructor: Constructor, position: number): void {
    this.selectedConstructor.set(constructor);
    this.selectedConstructorPosition.set(position);
    this.constructorModalVisible.set(true);
  }

  /**
   * Closes the constructor modal
   */
  closeConstructorModal(): void {
    this.constructorModalVisible.set(false);
    this.selectedConstructor.set(null);
    this.selectedConstructorPosition.set(0);
  }

  /**
   * Get constructor name for a driver by matching username
   */
  getConstructorForDriver(driverUsername: string): string {
    return this.constructorMap().get(driverUsername) || '';
  }
}