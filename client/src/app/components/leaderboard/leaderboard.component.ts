import { CommonModule } from '@angular/common';
import { Component, input, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { GridModule, TableDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ButtonCloseDirective, ThemeDirective, AlertModule } from '@coreui/angular';
import { LeaderBoard } from '../../../app/model/leaderboard'
import { FantaService } from '../../../app/service/fanta.service';
import { DbDataService } from '../../../app/service/db-data.service';
import { cilPeople, cilInfo, cilBell } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { AvatarComponent, TextColorDirective } from '@coreui/angular';
import type { User, FantaVote, TrackData } from '@f123dashboard/shared';
import { VoteHistoryTableComponent } from '../vote-history-table/vote-history-table.component';
import { allFlags } from '../../model/constants';


@Component({
    selector: 'app-leaderboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        GridModule,
        TableDirective,
        IconDirective,
        TextColorDirective,
        AvatarComponent,
        ModalComponent,
        ModalHeaderComponent,
        ModalTitleDirective,
        ModalBodyComponent,
        ButtonCloseDirective,
        ThemeDirective,
        VoteHistoryTableComponent,
        AlertModule
    ],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss'
})

export class LeaderboardComponent {
  private fantaService = inject(FantaService);
  private dbData = inject(DbDataService);

  maxDisplayable = input<number | undefined>(undefined);
  showVotes = input<boolean>(true);
  
  public cilPeople: string[] = cilPeople;
  public cilInfo: string[] = cilInfo;
  public cilBell: string[] = cilBell;
  public allFlags = allFlags;

  readonly leaderBoards = computed(() => {
    return this.dbData.users()
      .map(user => ({
        id: user.id,
        username: user.username,
        points: this.fantaService.getFantaPoints(user.id),
        numberVotes: this.fantaService.getFantaNumberVotes(user.id),
        avatarImage: user.image
      } satisfies LeaderBoard))
      .filter(lb => lb.numberVotes > 0)
      .sort((a, b) => b.points - a.points);
  });

  readonly totNumberVotes = this.fantaService.totNumberVotes;

  private modalVisibleSignal = signal<boolean>(false);
  readonly modalVisible = this.modalVisibleSignal.asReadonly();

  private selectedUserSignal = signal<User | null>(null);
  readonly selectedUser = this.selectedUserSignal.asReadonly();

  private userVotesSignal = signal<{ vote: FantaVote, trackId: number, trackName: string, trackCountry: string }[]>([]);
  readonly userVotes = this.userVotesSignal.asReadonly();
  
  getAvatar(userId: number, image?: string): string {
    if (image){
        return `data:image/jpeg;base64,${image}`;
      }
    
    // Fallback to file path
    return `./assets/images/avatars_fanta/${userId}.png`;
  }

  openVoteHistoryModal(userId: number): void {
    const users = this.dbData.users();
    const user = users.find(u => u.id === userId);
    if (!user) {return;}

    this.selectedUserSignal.set(user);
    this.loadUserVotes(userId);
    this.modalVisibleSignal.set(true);
  }

  private loadUserVotes(userId: number): void {
    const tracksWithResults = this.getTracksWithResults();
    const lastTwoTracks = this.getLastTwoTracks(tracksWithResults);
    const votes = this.getUserVotesForTracks(userId, lastTwoTracks);
    
    this.userVotesSignal.set(votes);
  }

  private getTracksWithResults() {
    const allTracks = this.dbData.tracks();
    return allTracks.filter(track => {
      const result = this.fantaService.getRaceResult(track.track_id);
      return result && result.id_1_place !== null && result.id_1_place !== undefined;
    });
  }


  private getLastTwoTracks(tracks: TrackData[]): TrackData[] {
    const sorted = [...tracks].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted.slice(0, 2);
  }

  private getUserVotesForTracks(userId: number, tracks: TrackData[]): { vote: FantaVote, trackId: number, trackName: string, trackCountry: string }[] {
    return tracks
      .map(track => {
        const vote = this.fantaService.getFantaVote(userId, track.track_id);
        return vote ? {
          vote,
          trackId: track.track_id,
          trackName: track.name,
          trackCountry: track.country
        } : null;
      })
      .filter(v => v !== null) as { vote: FantaVote, trackId: number, trackName: string, trackCountry: string }[];
  }

  handleModalVisibilityChange(visible: boolean): void {
    if (!visible) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modalVisibleSignal.set(false);
    this.selectedUserSignal.set(null);
    this.userVotesSignal.set([]);
  }
}
