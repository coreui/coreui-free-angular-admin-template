import { CommonModule } from '@angular/common';
import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { TableDirective, AvatarComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilPeople, cilCheckAlt, cilX, cilSwapVertical } from '@coreui/icons';
import { FantaService } from '../../service/fanta.service';
import { DbDataService } from '../../service/db-data.service';
import type { FantaVote, DriverData } from '@f123dashboard/shared';
import { VoteStatus } from '../../model/fanta';

@Component({
  selector: 'app-vote-history-table',
  imports: [
    CommonModule,
    TableDirective,
    IconDirective,
    AvatarComponent
  ],
  templateUrl: './vote-history-table.component.html',
  styleUrl: './vote-history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteHistoryTableComponent {
  fantaService = inject(FantaService);
  private dbData = inject(DbDataService);

  // Inputs as signals
  fantaVote = input.required<FantaVote>();
  trackId = input.required<number>();
  showTotalPoints = input<boolean>(true);

  public cilPeople: string[] = cilPeople;
  public cilCheckAlt: string[] = cilCheckAlt;
  public cilX: string[] = cilX;
  public cilSwapVertical: string[] = cilSwapVertical;

  // Vote status constants
  private readonly VOTE_STATUS_CORRECT: VoteStatus = { icon: cilCheckAlt, color: 'green' };
  private readonly VOTE_STATUS_INCORRECT: VoteStatus = { icon: cilX, color: 'red' };
  private readonly VOTE_STATUS_PARTIAL: VoteStatus = { icon: cilSwapVertical, color: '#FFA600' };

  // Computed signals for reactive state
  voteArray = computed(() => {
    const vote = this.fantaVote();
    if (!vote) {
      return [];
    }
    
    return [
      vote.id_1_place,
      vote.id_2_place,
      vote.id_3_place,
      vote.id_4_place,
      vote.id_5_place,
      vote.id_6_place,
      vote.id_7_place,
      vote.id_8_place,
      vote.id_fast_lap,
      vote.id_dnf,
      vote.constructor_id
    ];
  });

  raceResult = computed(() => 
    this.fantaService.getRaceResult(this.trackId())
  );

  fastLap = computed(() => 
    this.raceResult()?.id_fast_lap || 0
  );

  dnfList = computed(() => 
    this.raceResult()?.list_dnf || ''
  );

  winningConstructors = computed(() => 
    this.fantaService.getWinningConstructorsForTrack(this.trackId())
  );

  totalPoints = computed(() => 
    this.fantaService.getFantaRacePoints(this.fantaVote().fanta_player_id, this.trackId())
  );

  /**
   * Get vote array from FantaVote object
   */
  getVoteArray(): number[] {
    return this.voteArray();
  }

  getPilota(id: number): DriverData | null {
    return this.dbData.allDrivers().find(driver => +driver.driver_id === +id) || null;
  }

  getConstructor(id: number): string | null {
    const constructor = this.dbData.constructors().find(c => c.constructor_id === id);
    return constructor?.constructor_name || null;
  }

  getPosizioneArrivo(pilotaId: number): number {
    const result = this.raceResult();
    if (!result) {
      return 0;
    }
    
    const positions = [
      result.id_1_place, result.id_2_place, result.id_3_place, result.id_4_place,
      result.id_5_place, result.id_6_place, result.id_7_place, result.id_8_place
    ];
    
    const position = positions.findIndex(id => +id === +pilotaId);
    return position >= 0 ? position + 1 : 0;
  }

  getVotoPos(pilotaId: number): number {
    const voteArray = this.voteArray();
    const position = voteArray.slice(0, 8).findIndex(id => +id === +pilotaId);
    return position >= 0 ? position + 1 : 0;
  }

  getPunti(pilotaId: number): number {
    const posizioneReale = this.getPosizioneArrivo(pilotaId);
    const posizioneVotata = this.getVotoPos(pilotaId);
    
    if (posizioneReale === 0 || posizioneVotata === 0) {
      return 0;
    }
    
    // Both positions are 1-based (1-8), pass as-is to match service method usage
    return this.fantaService.pointsWithAbsoluteDifference(posizioneReale, posizioneVotata);
  }

  getPuntiFastLap(): number {
    const result = this.raceResult();
    if (!result) {
      return 0;
    }
    
    const vote = this.fantaVote();
    return +result.id_fast_lap === +vote.id_fast_lap && vote.id_fast_lap !== 0
      ? this.fantaService.getCorrectResponsePointFastLap()
      : 0;
  }

  getPuntiDnf(): number {
    const result = this.raceResult();
    if (!result) {
      return 0;
    }
    
    const vote = this.fantaVote();
    return this.fantaService.isDnfCorrect(result.list_dnf, +vote.id_dnf) && +vote.id_dnf !== 0
      ? this.fantaService.getCorrectResponsePointDnf()
      : 0;
  }

  getPuntiConstructor(): number {
    const winningConstructorIds = this.winningConstructors();
    if (winningConstructorIds.length === 0) {
      return 0;
    }
    
    const vote = this.fantaVote();
    return winningConstructorIds.includes(+vote.constructor_id) && +vote.constructor_id !== 0
      ? this.fantaService.getCorrectResponsePointTeam()
      : 0;
  }

  getTotalPoints(): number {
    return this.totalPoints();
  }

  isCorrect(pilotaId: number): VoteStatus {
    const posizioneReale = this.getPosizioneArrivo(pilotaId);
    const posizioneVotata = this.getVotoPos(pilotaId);
    
    if (posizioneReale === 0 || posizioneVotata === 0) {
      return this.VOTE_STATUS_INCORRECT;
    }
    
    const punti = this.fantaService.pointsWithAbsoluteDifference(posizioneReale, posizioneVotata);
    
    if (punti === FantaService.CORRECT_RESPONSE_POINTS[0]) {
      return this.VOTE_STATUS_CORRECT;
    }
    
    if (punti === FantaService.CORRECT_RESPONSE_POINTS[1] || 
        punti === FantaService.CORRECT_RESPONSE_POINTS[2]) {
      return this.VOTE_STATUS_PARTIAL;
    }
    
    return this.VOTE_STATUS_INCORRECT;
  }

  isCorrectFastLap(): VoteStatus {
    const result = this.raceResult();
    if (!result) {
      return this.VOTE_STATUS_INCORRECT;
    }
    
    const vote = this.fantaVote();
    const isCorrect = +result.id_fast_lap === +vote.id_fast_lap && +vote.id_fast_lap !== 0;
    return isCorrect 
      ? this.VOTE_STATUS_CORRECT
      : this.VOTE_STATUS_INCORRECT;
  }

  isCorrectDnf(): VoteStatus {
    const result = this.raceResult();
    if (!result) {
      return this.VOTE_STATUS_INCORRECT;
    }
    
    const vote = this.fantaVote();
    const isCorrect = this.fantaService.isDnfCorrect(result.list_dnf, +vote.id_dnf) && +vote.id_dnf !== 0;
    return isCorrect 
      ? this.VOTE_STATUS_CORRECT
      : this.VOTE_STATUS_INCORRECT;
  }

  isCorrectConstructor(): VoteStatus {
    const winningConstructorIds = this.winningConstructors();
    if (winningConstructorIds.length === 0) {
      return this.VOTE_STATUS_INCORRECT;
    }
    
    const vote = this.fantaVote();
    const isCorrect = winningConstructorIds.includes(+vote.constructor_id) && +vote.constructor_id !== 0;
    return isCorrect 
      ? this.VOTE_STATUS_CORRECT
      : this.VOTE_STATUS_INCORRECT;
  }

  getFastLap(): number {
    return this.fastLap();
  }

  getDnf(): string {
    return this.dnfList();
  }
}
