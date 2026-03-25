import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BadgeComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ContainerComponent } from '@coreui/angular';
import { cifBh, cifAt, cifMc, cifJp, cifHu, cifCn, cifCa, cifEs, cifGb, cifBe, cifNl, cifAz, cifSg, cifIt, cifUs, cifAu, cifMx, cifBr, cifQa, cifAe, cifSa } from '@coreui/icons';
import { cilFire } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { DbDataService } from '../../service/db-data.service';
import { allFlags } from '../../model/constants';
import type { ChampionshipData, SessionResult } from '@f123dashboard/shared';

@Component({
    selector: 'app-championship',
    imports: [BadgeComponent, ContainerComponent, IconDirective, CommonModule, IconDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective],
    templateUrl: './championship.component.html',
    styleUrl: './championship.component.scss'
})
export class ChampionshipComponent implements OnInit{
  private dbData = inject(DbDataService);


  public championship_data: ChampionshipData[] = [];
  public allFlags = allFlags;


  public fireIcon: string[] = cilFire;

  ngOnInit(): void {
    this.championship_data = this.dbData.championship();
  }

  // Helper method to get driver by position in a session
  getDriverByPosition(session: SessionResult[] | undefined, position: number): string {
    if (!session) {return '';}
    const result = session.find(r => r.position === position);
    return result?.driver_username || '';
  }

  // Helper method to get DNF drivers
  getDNFDrivers(session: SessionResult[] | undefined): string {
    if (!session) {return '';}
    const dnfDrivers = session.filter(r => r.position === 0);
    return dnfDrivers.map(d => d.driver_username).join(', ');
  }

  // Helper method to get the active race session (race or full_race based on has_x2)
  getActiveRaceSession(gp: ChampionshipData): SessionResult[] | undefined {
    return gp.gran_prix_has_x2 === 1 ? gp.sessions.full_race : gp.sessions.race;
  }

  // Helper method to get fast lap driver for active race session
  getActiveFastLapDriver(gp: ChampionshipData): string {
    const sessionType = gp.gran_prix_has_x2 === 1 ? 'full_race' : 'race';
    return gp.fastLapDrivers[sessionType] || '';
  }

  // Helper method to check if session has any results
  hasSessionResults(session: SessionResult[] | undefined): boolean {
    return !!(session && session.length > 0);
  }

  // Helper method to get sorted results (excluding DNFs for position display)
  getSortedResults(session: SessionResult[] | undefined): SessionResult[] {
    if (!session) {return [];}
    return session
      .filter(result => result.position > 0) // Exclude DNFs (position 0)
      .sort((a, b) => a.position - b.position);
  }

  // Helper method to get all possible positions across all sessions
  getAllPositions(gp: ChampionshipData): number[] {
    const positions = new Set<number>();
    
    // Get positions from all sessions
    const sessions = [
      gp.sessions.race,
      gp.sessions.full_race,
      gp.sessions.sprint,
      gp.sessions.qualifying,
      gp.sessions.free_practice
    ];

    sessions.forEach(session => {
      if (session) 
        {session.forEach(result => {
          if (result.position > 0)  // Exclude DNFs
            {positions.add(result.position);}
          
        });}
      
    });

    // Convert to sorted array
    return Array.from(positions).sort((a, b) => a - b);
  }

  // Helper method to get position styling
  getPositionStyle(position: number): Record<string, string> {
    if (position === 1) {return { 'color': 'green' };}
    if (position === 8) {return { 'color': 'red' };}
    // No styling for other positions (was previously black)
    return {};
  }

  // Helper method to get position name for medal images
  getPositionName(position: number): string {
    switch (position) {
      case 1: return 'first';
      case 2: return 'second';
      case 3: return 'third';
      default: return '';
    }
  }
  isDone(gp: ChampionshipData): boolean {
    return gp.sessions.race !== undefined || 
      gp.sessions.full_race !== undefined || 
      gp.sessions.qualifying !== undefined;
  }
}