import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';    
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionComponent, 
    AccordionItemComponent, 
    FormModule, 
    SharedModule,
    ButtonDirective, 
    TemplateIdDirective,
    AccordionButtonDirective,
    AvatarComponent,
    UtilitiesModule,
    BadgeComponent} from '@coreui/angular';
import { AuthService } from './../../service/auth.service';
import { GridModule } from '@coreui/angular';
import { DbDataService } from './../../service/db-data.service';
import { FantaService } from './../../service/fanta.service';
import { cilFire, cilPowerStandby, cilPeople } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { VOTE_INDEX, FORM_STATUS, DRIVER_POSITIONS_COUNT, TOTAL_VOTE_FIELDS, FantaVoteHelper } from '../../model/fanta';
import { medals, allFlags, posizioni } from '../../model/constants';
import { LeaderboardComponent } from "../../components/leaderboard/leaderboard.component";
import { VoteHistoryTableComponent } from '../../components/vote-history-table/vote-history-table.component';
import { FantaRulesComponent } from '../../components/fanta-rules/fanta-rules.component';
import {
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';
import type { FantaVote, User, DriverData, TrackData } from '@f123dashboard/shared';

@Component({
    selector: 'app-fanta',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FormsModule,
        FormModule,
        ButtonDirective,
        GridModule,
        SharedModule,
        AccordionComponent,
        AccordionItemComponent,
        TemplateIdDirective,
        AccordionButtonDirective,
        IconDirective,
        DatePipe,
        AvatarComponent,
        UtilitiesModule,
        BadgeComponent,
        LeaderboardComponent,
        VoteHistoryTableComponent,
        FantaRulesComponent,
        ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent
    ],
    templateUrl: './fanta.component.html',
    styleUrl: './fanta.component.scss'
})
export class FantaComponent implements OnInit {
  authService = inject(AuthService);
  private dbData = inject(DbDataService);
  fantaService = inject(FantaService);

  // Signals for reactive state
  private formStatusSignal = signal<Record<number, number>>({});
  readonly formStatus = this.formStatusSignal.asReadonly();
  
  private validationDetailsSignal = signal<Record<number, { hasEmptyVotes: boolean; hasDuplicates: boolean }>>({});
  readonly validationDetails = this.validationDetailsSignal.asReadonly();
  
  private loadingSignal = signal<Record<number, boolean>>({});
  readonly loading = this.loadingSignal.asReadonly();
  
  forms: Record<number, NgForm> = {};
  
  private userSignal = signal<User>(null!);
  readonly user = this.userSignal.asReadonly();
  
  private pilotiSignal = signal<DriverData[]>([]);
  readonly piloti = this.pilotiSignal.asReadonly();
  
  private tracksSignal = signal<TrackData[]>([]);
  readonly tracks = this.tracksSignal.asReadonly();
  
  private constructorsSignal = signal<Map<number, string>>(new Map());
  readonly constructors = this.constructorsSignal.asReadonly();
  
  private nextTracksSignal = signal<TrackData[]>([]);
  readonly nextTracks = this.nextTracksSignal.asReadonly();
  
  private previusTracksSignal = signal<TrackData[]>([]);
  readonly previusTracks = this.previusTracksSignal.asReadonly();
  
  // Maps track ID to vote array [place1-8, fastLap, dnf, constructor]
  private votazioniSignal = signal<Map<number, number[]>>(new Map());
  readonly votazioni = this.votazioniSignal.asReadonly();
  
  // Store original loaded data for change detection
  private originalVotazioniSignal = signal<Map<number, number[]>>(new Map());
  readonly originalVotazioni = this.originalVotazioniSignal.asReadonly();
  
  // Computed user fanta points
  readonly userFantaPoints = computed(() => 
    this.fantaService.getFantaPoints(this.user().id)
  );
  
  private modalRankingVisibleSignal = signal<boolean>(false);
  readonly modalRankingVisible = this.modalRankingVisibleSignal.asReadonly();
  
  private modalRulesVisibleSignal = signal<boolean>(false);
  readonly modalRulesVisible = this.modalRulesVisibleSignal.asReadonly();

  public fireIcon: string[] = cilFire;
  public powerIcon: string[] = cilPowerStandby;
  public teamIcon: string[] = cilPeople;
  public posizioni = posizioni;
  public medals = medals;
  public allFlags = allFlags;

  ngOnInit(): void {
    this.loadUserFromSession();
    this.loadDriversTracksAndConstructors();
    this.filterTracks();
    this.loadPreviousVotes();
  }

  /**
   * Loads user data from session storage.
   */
  private loadUserFromSession(): void {
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      throw new Error('User not found in session storage. User must be logged in to access this component.');
    }
    const user = JSON.parse(userString) as User;
    if (!user.id) {
      throw new Error('Invalid user data: missing user ID. User must be logged in to access this component.');
    }
    this.userSignal.set(user);
  }

  /**
   * Loads drivers, tracks, and constructors from database service.
   */
  private loadDriversTracksAndConstructors(): void {
    this.pilotiSignal.set(this.dbData.allDrivers());
    this.tracksSignal.set(this.dbData.tracks());
    const constructorsMap = new Map<number, string>();
    this.dbData.constructors().forEach(constructor => {
      constructorsMap.set(constructor.constructor_id, constructor.constructor_name);
    });
    this.constructorsSignal.set(constructorsMap);
  }

  /**
   * Filters tracks into upcoming and previous races.
   */
  private filterTracks(): void {
    const today = new Date();
    
    this.nextTracksSignal.set(
      this.tracks()
        .filter(item => new Date(item.date) > today)
        .slice(0, 4)
    );

    this.previusTracksSignal.set(
      this.tracks()
        .filter(item => new Date(item.date) <= today)
    );
  }

  /**
   * Loads previously saved votes for all tracks.
   */
  private loadPreviousVotes(): void {
    this.previusTracks().forEach(track => this.applyPreviousVote(track));
    this.nextTracks().forEach(track => this.applyPreviousVote(track));
  }

  /**
   * Applies previously saved vote data to a track.
   */
  private applyPreviousVote(track: TrackData): void {
    const previousVote = this.fantaService.getFantaVote(this.user().id, track.track_id);
    if (!previousVote) {return;}
    
    // Convert Fanta object to array using helper
    const previousVoteArray = Array.from(FantaVoteHelper.toArray(previousVote));
    
    // Update signals immutably
    this.votazioniSignal.update(map => {
      const newMap = new Map(map);
      newMap.set(track.track_id, previousVoteArray);
      return newMap;
    });
    
    this.originalVotazioniSignal.update(map => {
      const newMap = new Map(map);
      newMap.set(track.track_id, [...previousVoteArray]);
      return newMap;
    });
  }

  /**
   * Publishes a vote for a specific track.
   * @param trackId The track identifier
   * @param form The form reference for validation
   */
  async publishVoto(trackId: number, form: NgForm): Promise<void> {
    this.forms[trackId] = form;
    
    const validation = this.validateForm(trackId);
    if (!validation.isValid) {
      this.formStatusSignal.update(status => ({ ...status, [trackId]: FORM_STATUS.VALIDATION_ERROR }));
      this.validationDetailsSignal.update(details => ({ 
        ...details, 
        [trackId]: { hasEmptyVotes: validation.hasEmptyVotes, hasDuplicates: validation.hasDuplicates } 
      }));
      return;
    }

    // Set loading state
    this.loadingSignal.update(loading => ({ ...loading, [trackId]: true }));

    const votes = this.votazioni().get(trackId) || [];
    const fantaVoto: FantaVote = {
      fanta_player_id: this.user().id,
      username: this.user().username,
      track_id: trackId,
      id_1_place: votes[VOTE_INDEX.PLACE_1],
      id_2_place: votes[VOTE_INDEX.PLACE_2],
      id_3_place: votes[VOTE_INDEX.PLACE_3],
      id_4_place: votes[VOTE_INDEX.PLACE_4],
      id_5_place: votes[VOTE_INDEX.PLACE_5],
      id_6_place: votes[VOTE_INDEX.PLACE_6],
      id_7_place: votes[VOTE_INDEX.PLACE_7],
      id_8_place: votes[VOTE_INDEX.PLACE_8],
      id_fast_lap: votes[VOTE_INDEX.FAST_LAP],
      id_dnf: votes[VOTE_INDEX.DNF],
      constructor_id: votes[VOTE_INDEX.CONSTRUCTOR]
    };
    
    try {
      await this.fantaService.setFantaVote(fantaVoto);
      this.formStatusSignal.update(status => ({ ...status, [trackId]: FORM_STATUS.SUCCESS }));
      
      // Update the original votazioni to reflect the saved state
      const currentVotes = this.votazioni().get(trackId);
      if (currentVotes) {
        this.originalVotazioniSignal.update(map => {
          const newMap = new Map(map);
          newMap.set(trackId, [...currentVotes]);
          return newMap;
        });
      }
    } catch (error) {
      console.error('Error saving fantasy vote:', error);
      this.formStatusSignal.update(status => ({ ...status, [trackId]: FORM_STATUS.SAVE_ERROR }));
    } finally {
      // Clear loading state
      this.loadingSignal.update(loading => ({ ...loading, [trackId]: false }));
    }
  }

  /**
   * Validates if a vote form is complete and valid.
   * @param trackId The track identifier
   * @returns Validation result with specific error details
   */
  private validateForm(trackId: number): { isValid: boolean; hasEmptyVotes: boolean; hasDuplicates: boolean } {
    const votoArray = this.votazioni().get(trackId) || [];
    
    // Check if all required fields are present
    if (votoArray.length < TOTAL_VOTE_FIELDS) {
      return { isValid: false, hasEmptyVotes: true, hasDuplicates: false };
    }
    
    // Check for empty votes in all required positions
    const hasEmptyVotes = votoArray.some((v, i) => i <= VOTE_INDEX.CONSTRUCTOR && v === 0);
    
    // Check for duplicates only in driver positions (indices 0-7)
    const driverVotes = votoArray.slice(0, DRIVER_POSITIONS_COUNT);
    const hasDuplicates = driverVotes.some((v, i) => driverVotes.indexOf(v) !== i);
    
    return { 
      isValid: !hasEmptyVotes && !hasDuplicates, 
      hasEmptyVotes, 
      hasDuplicates 
    };
  }

  /**
   * Checks if a vote form is complete and valid.
   * @param trackId The track identifier
   * @returns true if form is valid, false otherwise
   */
  formIsValid(trackId: number): boolean {
    return this.validateForm(trackId).isValid;
  }

  /**
   * Gets a specific vote value for a track.
   * @param trackId The track identifier
   * @param index 1-based index (1-11)
   * @returns The vote value or 0 if not found
   */
  getVoto(trackId: number, index: number): number {
    const votoArray = this.votazioni().get(trackId) || [];
    return votoArray[index - 1] || 0;
  }

  /**
   * Gets the position where a driver was voted.
   * @param trackId The track identifier
   * @param pilota The driver ID
   * @returns The position (1-8) or 0 if not found
   */
  getVotoPos(trackId: number, pilota: number): number {
    const votoArray = this.votazioni().get(trackId) || [];
    const posizione = votoArray.indexOf(pilota);
    return posizione >= 0 ? posizione + 1 : 0;
  }

  /**
   * Gets all votes for a track.
   * @param trackId The track identifier
   * @returns Array of votes or undefined
   */
  getVoti(trackId: number): number[] | undefined { 
    return this.votazioni().get(trackId);
  }
  
  /**
   * Sets a specific vote value for a track.
   * @param trackId The track identifier
   * @param index 1-based index (1-11)
   * @param valore The vote value
   * @param form The form reference
   */
  setVoto(trackId: number, index: number, valore: number, form: NgForm): void {
    this.forms[trackId] = form;
    
    if (!valore) {return;}
    
    // Update votazioni signal immutably
    this.votazioniSignal.update(votazioniMap => {
      const newMap = new Map(votazioniMap);
      let votoArray = newMap.get(trackId);
      
      if (!votoArray) {
        votoArray = [];
      } else {
        votoArray = [...votoArray]; // Create a copy
      }
      
      votoArray[index - 1] = +valore;
      newMap.set(trackId, votoArray);
      return newMap;
    });
    
    // Reset form status and validation details when data is changed
    if (this.formStatus()[trackId] === FORM_STATUS.SUCCESS) {
      this.formStatusSignal.update(status => {
        const newStatus = { ...status };
        delete newStatus[trackId];
        return newStatus;
      });
    }
    
    // Clear validation details when user makes changes
    if (this.validationDetails()[trackId]) {
      this.validationDetailsSignal.update(details => {
        const newDetails = { ...details };
        delete newDetails[trackId];
        return newDetails;
      });
    }
  }

  toggleModalRanking() {
    this.modalRankingVisibleSignal.update(value => !value);
  }

  toggleModalRules() {
    this.modalRulesVisibleSignal.update(value => !value);
  }

  /**
   * Checks if there are unsaved changes for a track.
   */
  hasUnsavedData(trackId: number): boolean {
    const currentVotes = this.votazioni().get(trackId) || [];
    const originalVotes = this.originalVotazioni().get(trackId) || [];
    
    // If form was just saved successfully, no unsaved data
    if (this.formStatus()[trackId] === FORM_STATUS.SUCCESS) {
      return false;
    }
    
    // Check if there are any votes entered
    const hasVotes = currentVotes.some(vote => vote && vote > 0);
    
    // If no votes at all, no unsaved data
    if (!hasVotes) {return false;}
    
    // If there are no original votes but current votes exist, it's unsaved
    if (originalVotes.length === 0) {return true;}
    
    // Compare current votes with original votes
    if (currentVotes.length !== originalVotes.length) {return true;}
    
    // Check if any vote has changed
    return currentVotes.some((vote, i) => vote !== originalVotes[i]);
  }

  /**
   * Checks if no vote data exists for a track.
   */
  hasNoData(trackId: number): boolean {
    const currentVotes = this.votazioni().get(trackId) || [];
    
    // If form is already saved, don't show "Votazione Mancante"
    if (this.formStatus()[trackId] === FORM_STATUS.SUCCESS) {
      return false;
    }
    
    // Show "Votazione Mancante" if no votes are entered at all
    const hasAnyVotes = currentVotes.some(vote => vote && vote > 0);
    return !hasAnyVotes;
  }
  
  get avatarSrc(): string {
    return this.dbData.getAvatarSrc(this.user());
  }

  /**
   * Checks if a form is currently being submitted.
   */
  isLoading(trackId: number): boolean {
    return this.loading()[trackId] || false;
  }

  /**
   * Convert vote array to FantaVote object for the reusable component
   */
  getFantaVoteObject(trackId: number): FantaVote {
    const voteArray = this.votazioni().get(trackId) || [];
    return {
      fanta_player_id: this.user().id,
      username: this.user().username,
      track_id: trackId,
      id_1_place: voteArray[VOTE_INDEX.PLACE_1] || 0,
      id_2_place: voteArray[VOTE_INDEX.PLACE_2] || 0,
      id_3_place: voteArray[VOTE_INDEX.PLACE_3] || 0,
      id_4_place: voteArray[VOTE_INDEX.PLACE_4] || 0,
      id_5_place: voteArray[VOTE_INDEX.PLACE_5] || 0,
      id_6_place: voteArray[VOTE_INDEX.PLACE_6] || 0,
      id_7_place: voteArray[VOTE_INDEX.PLACE_7] || 0,
      id_8_place: voteArray[VOTE_INDEX.PLACE_8] || 0,
      id_fast_lap: voteArray[VOTE_INDEX.FAST_LAP] || 0,
      id_dnf: voteArray[VOTE_INDEX.DNF] || 0,
      constructor_id: voteArray[VOTE_INDEX.CONSTRUCTOR] || 0
    };
  }

}
