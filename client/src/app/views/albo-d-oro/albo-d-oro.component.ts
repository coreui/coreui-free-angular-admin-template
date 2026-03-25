import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, TableModule } from '@coreui/angular';
import { PodiumCardComponent } from '../../components/podium-card/podium-card.component';
import { GridModule } from '@coreui/angular';
import { DbDataService } from '../../service/db-data.service';
import type { DriverData } from '@f123dashboard/shared';

interface PodiumEntry {
  posizione: number;
  nome: string;
  img: string;
  colore: string;
  punti: string;
}

interface ClassificaEntry {
  posizione: string;
  nome: string;
  punti: string;
}

const CURRENT_SEASON_ID = 1;
const PODIUM_SIZE = 3;
const DRIVER_AVATAR_PATH = '/assets/images/avatars';
const FANTA_AVATAR_PATH = '/assets/images/avatars_fanta';

const FANTA_PODIUM_DATA: PodiumEntry[] = [
  { posizione: 2, nome: 'Chichi', punti: '481', img: `${FANTA_AVATAR_PATH}/chichi.jpg`, colore: '#008080' },
  { posizione: 1, nome: 'ProprioGiotto', punti: '499', img: `${FANTA_AVATAR_PATH}/7.png`, colore: '#f699cd' },
  { posizione: 3, nome: 'Fambler', punti: '480', img: `${FANTA_AVATAR_PATH}/2.png`, colore: '#ff0000ff' }
];

const FANTA_CLASSIFICA_DATA: ClassificaEntry[] = [
  { posizione: '#4', nome: 'Shika', punti: '472' },
  { posizione: '#5', nome: 'Matte', punti: '432' },
  { posizione: '#6', nome: 'Ali', punti: '414' },
  { posizione: '#7', nome: 'Sara', punti: '386' },
  { posizione: '#8', nome: 'BoxBoxBunny', punti: '381' },
  { posizione: '#9', nome: 'Omix', punti: '347' },
  { posizione: '#10', nome: 'GommaRosa', punti: '304' }
];

@Component({
  selector: 'app-albo-d-oro',
  imports: [CommonModule, PodiumCardComponent, GridModule, CardModule, TableModule],
  templateUrl: './albo-d-oro.component.html',
  styleUrls: ['./albo-d-oro.component.scss']
})
export class AlboDOroComponent implements OnInit {
  private dbDataService = inject(DbDataService);
  private cdr = inject(ChangeDetectorRef);

  isLoadingDrivers = true;
  podio: PodiumEntry[] = [];
  classifica: ClassificaEntry[] = [];
  podioFanta: PodiumEntry[] = FANTA_PODIUM_DATA;
  classificaFanta: ClassificaEntry[] = FANTA_CLASSIFICA_DATA;

  async ngOnInit(): Promise<void> {
    await this.loadDriversChampionship();
  }

  private async loadDriversChampionship(): Promise<void> {
    try {
      const drivers = await this.dbDataService.getDriversBySeason(CURRENT_SEASON_ID);
      const sortedDrivers = this.sortDriversByPoints(drivers);
      
      this.podio = this.buildPodium(sortedDrivers);
      this.classifica = this.buildClassifica(sortedDrivers);
      this.isLoadingDrivers = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading drivers championship:', error);
      this.isLoadingDrivers = false;
      this.cdr.detectChanges();
    }
  }

  private sortDriversByPoints(drivers: DriverData[]): DriverData[] {
    return drivers.sort((a, b) => +b.total_points - +a.total_points);
  }

  private buildPodium(drivers: DriverData[]): PodiumEntry[] {
    const topDrivers = drivers.slice(0, PODIUM_SIZE);
    
    if (topDrivers.length < PODIUM_SIZE) {
      return topDrivers.map((driver, index) => this.createPodiumEntry(driver, index + 1));
    }

    return [
      this.createPodiumEntry(topDrivers[1], 2),
      this.createPodiumEntry(topDrivers[0], 1),
      this.createPodiumEntry(topDrivers[2], 3)
    ];
  }

  private createPodiumEntry(driver: DriverData, position: number): PodiumEntry {
    return {
      posizione: position,
      nome: driver.driver_username,
      img: `${DRIVER_AVATAR_PATH}/${driver.driver_username}.png`,
      colore: driver.driver_color,
      punti: driver.total_points.toString()
    };
  }

  private buildClassifica(drivers: DriverData[]): ClassificaEntry[] {
    return drivers
      .slice(PODIUM_SIZE)
      .map((driver, index) => ({
        posizione: `#${index + PODIUM_SIZE + 1}`,
        nome: driver.driver_username,
        punti: driver.total_points.toString()
      }));
  }
}