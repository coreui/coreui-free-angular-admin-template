import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { PlaygroundBestScore } from '@f123dashboard/shared';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  private apiService = inject(ApiService);

/****************************************************************/
//variabili locali
/****************************************************************/
  private playgroundLeaderboardSignal = signal<PlaygroundBestScore[]>([]);
  
  // Readonly signal for external access
  public playgroundLeaderboard = this.playgroundLeaderboardSignal.asReadonly();


/****************************************************************/
//compilazione delle variabili pre caricamento del interfaccia web 
/****************************************************************/

  async allData() {
    const [
      playgroundLeaderboard
    ] = await Promise.all([
      firstValueFrom(this.apiService.post<PlaygroundBestScore[]>('/playground/leaderboard', {}))
    ]);

    this.playgroundLeaderboardSignal.set(playgroundLeaderboard);
  }

  getUserBestScore(userId: number): number {
    const userScore = this.playgroundLeaderboardSignal().find(score => score.user_id === userId);
    return userScore ? userScore.best_score : 9999; // return 9999 if no score found
  }

  async setUserBestScore(voto: PlaygroundBestScore): Promise<void> {
    await firstValueFrom(
      this.apiService.post('/playground/score', voto)
    );
    
    // Update the signal with the new score
    this.playgroundLeaderboardSignal.update(leaderboard => {
      const tmp = [...leaderboard];
      const foundIndex = tmp.findIndex(score => score.user_id === voto.user_id);
      if (foundIndex === -1) {
        // New entry
        tmp.push(voto);
      } else {
        // Update existing entry
        tmp[foundIndex] = voto;
      }
      // Sort by best score
      return tmp.sort((a, b) => a.best_score - b.best_score);
    });
  }
}

export { PlaygroundBestScore };
