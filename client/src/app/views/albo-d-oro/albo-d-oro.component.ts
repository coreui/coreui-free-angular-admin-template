import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '@coreui/angular';
import { PodiumCardComponent } from '../../components/podium-card/podium-card.component';
import { DbDataService } from '../../service/db-data.service';
import type { DriverData } from '@f123dashboard/shared';

interface PodiumEntry {
  nome: string;
  img: string;
  colore: string;
  punti: string;
}

interface ClassificaEntry {
  nome: string;
  punti: string;
}

interface SeasonDriverState {
  isLoading: boolean;
  podio: PodiumEntry[];
  classifica: ClassificaEntry[];
}

interface SeasonConfig {
  id: number;
  driverTitle: string;
  fantaTitle: string;
  fantaPodio: PodiumEntry[];
  fantaClassifica: ClassificaEntry[];
}

interface SeasonDisplay extends SeasonConfig {
  isLoading: boolean;
  driverPodio: PodiumEntry[];
  driverClassifica: ClassificaEntry[];
}

const PODIUM_SIZE = 3;
const DRIVER_AVATAR_PATH = '/assets/images/avatars';
const FANTA_AVATAR_PATH = '/assets/images/avatars_fanta';

const SEASONS: SeasonConfig[] = [
  {
    id: 2,
    driverTitle: 'Campionato piloti 2025-26',
    fantaTitle: 'Fanta 2025-26',
    fantaPodio: [
      { nome: 'chichi', punti: '816', img: `${FANTA_AVATAR_PATH}/chichi.jpg`, colore: '#008080' },
      { nome: 'BoxBoxBuddy', punti: '798', img: `${FANTA_AVATAR_PATH}/BoxBoxBuddy.png`, colore: '#ff0000ff' },
      { nome: 'propriogiotto', punti: '793', img: `${FANTA_AVATAR_PATH}/propriogiotto.png`, colore: '#f699cd' }
     
    ],
    fantaClassifica: [
      { nome: 'ferrari', punti: '410' },
      { nome: 'Togliattigrad', punti: '185' },
      { nome: 'Benver07', punti: '140' },
      { nome: 'shika', punti: '127' },
      { nome: 'Fambler', punti: '96' },
      { nome: 'kabubi', punti: '86' },
      { nome: 'Redmambalover99', punti: '49' },
    ],
  },
  {
    id: 1,
    driverTitle: 'Campionato piloti 2024-25',
    fantaTitle: 'Fanta 2024-25',
    fantaPodio: [
      { nome: 'ProprioGiotto', punti: '499', img: `${FANTA_AVATAR_PATH}/7.png`, colore: '#f699cd' },
      { nome: 'Chichi', punti: '481', img: `${FANTA_AVATAR_PATH}/chichi.jpg`, colore: '#008080' },
      { nome: 'Fambler', punti: '480', img: `${FANTA_AVATAR_PATH}/2.png`, colore: '#ff0000ff' },
    ],
    fantaClassifica: [
      { nome: 'Shika', punti: '472' },
      { nome: 'Matte', punti: '432' },
      { nome: 'Ali', punti: '414' },
      { nome: 'Sara', punti: '386' },
      { nome: 'BoxBoxBunny', punti: '381' },
      { nome: 'Omix', punti: '347' },
      { nome: 'GommaRosa', punti: '304' },
    ],
  },
];

@Component({
  selector: 'app-albo-d-oro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PodiumCardComponent, CardModule],
  templateUrl: './albo-d-oro.component.html',
  styleUrls: ['./albo-d-oro.component.scss']
})
export class AlboDOroComponent implements OnInit {
  private dbDataService = inject(DbDataService);

  private driverStates = signal<Record<number, SeasonDriverState>>(
    Object.fromEntries(SEASONS.map(s => [s.id, { isLoading: true, podio: [], classifica: [] }]))
  );

  seasons = computed<SeasonDisplay[]>(() =>
    SEASONS.map(config => ({
      ...config,
      isLoading: this.driverStates()[config.id].isLoading,
      driverPodio: this.driverStates()[config.id].podio,
      driverClassifica: this.driverStates()[config.id].classifica,
    }))
  );

  async ngOnInit(): Promise<void> {
    await Promise.all(SEASONS.map(s => this.loadChampionship(s.id)));
  }

  private async loadChampionship(seasonId: number): Promise<void> {
    try {
      const drivers = await this.dbDataService.getDriversBySeason(seasonId);
      const sorted = [...drivers].sort((a, b) => +b.total_points - +a.total_points);
      this.driverStates.update(states => ({
        ...states,
        [seasonId]: { isLoading: false, podio: this.buildPodium(sorted), classifica: this.buildClassifica(sorted) },
      }));
    } catch (error) {
      console.error(`Error loading season ${seasonId} drivers:`, error);
      this.driverStates.update(states => ({
        ...states,
        [seasonId]: { ...states[seasonId], isLoading: false }
      }));
    }
  }

  private buildPodium(drivers: DriverData[]): PodiumEntry[] {
    return drivers.slice(0, PODIUM_SIZE).map(driver => this.toPodiumEntry(driver));
  }

  private toPodiumEntry(driver: DriverData): PodiumEntry {
    return {
      nome: driver.driver_username,
      img: `${DRIVER_AVATAR_PATH}/${driver.driver_username}.png`,
      colore: driver.driver_color,
      punti: driver.total_points.toString()
    };
  }

  private buildClassifica(drivers: DriverData[]): ClassificaEntry[] {
    return drivers.slice(PODIUM_SIZE).map(driver => ({
      nome: driver.driver_username,
      punti: driver.total_points.toString()
    }));
  }
}
