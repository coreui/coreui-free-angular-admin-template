import { Component, AfterViewInit, OnInit, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { GridModule, TableDirective, AvatarComponent, AlertComponent, ColorModeService } from '@coreui/angular';
import { cilPeople, cilWarning } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { PlaygroundService, PlaygroundBestScore } from '../../service/playground.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-playground',
  imports: [
    GridModule,
    TableDirective,
    IconDirective,
    AvatarComponent,
    AlertComponent,
    DatePipe,
    CommonModule
  ],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundComponent implements OnInit, AfterViewInit {

  playgroundService = inject(PlaygroundService);
  private authService = inject(AuthService);
  readonly #colorModeService = inject(ColorModeService);

  public screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // Use the service's signal directly
  playgroundLeaderboard = this.playgroundService.playgroundLeaderboard;
  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => this.authService.isAuthenticated());

  public cilPeople: string[] = cilPeople;
  public cilWarning: string[] = cilWarning;

  bulbsUp: NodeListOf<HTMLElement> | null = null;
  bulbs: NodeListOf<HTMLElement> | null = null;
  isTimerStarted = signal(false);
  isLightsTriggered = signal(false);
  hasLightsError = signal(false);
  timerStartTime: number | null = null;
  playerStatus = signal("");
  playerStatusColor = signal("");  
  playerScore = signal<number | null>(null);
  playerBestScore = signal<number>(9999);
  hasJumpStart = signal(false);

  ngOnInit(): void {
    // Initialize best score for logged-in users
    if (this.isLoggedIn() && this.currentUser()?.id) {
      this.playerBestScore.set(this.playgroundService.getUserBestScore(this.currentUser()!.id));
    }
    this.resetGameText();
  }


  ngAfterViewInit(): void {
    this.bulbsUp = document.querySelectorAll<HTMLElement>('.bulb_up');
    this.bulbs = document.querySelectorAll<HTMLElement>('.bulb');
  }

  showColumn(): boolean {
    return this.screenWidth > 1600;
  }

  gameTrigger(): void {
    if (!this.isTimerStarted()) {
      if (this.hasLightsError()) {
        return;
      }

      if (this.isLightsTriggered()) {
        // Jump start condition
        this.playerStatus.set(`FALSA PARTENZA`);
        this.playerStatusColor.set("#FF0000");
        this.isLightsTriggered.set(false);
        this.hasJumpStart.set(true);
        this.lightsError();
        return;
      }

      // Start light up sequence
      this.resetGameText();
      this.isLightsTriggered.set(true);
      this.lightsUp();
      return;
    }

    // Record reaction time and game over
    const elapsedTime = Date.now() - (this.timerStartTime ?? 0);
    this.playerScore.set(elapsedTime);
    this.playerStatus.set(`Tempo di reazione: ${this.playerScore()} ms`);
    this.playerStatusColor.set("#0E8F5F");

    this.isTimerStarted.set(false);
    this.timerStartTime = null;
    this.isLightsTriggered.set(false);

    const playerScoreValue = this.playerScore();
    if (playerScoreValue === null) {
      return;
    }

    // Update best score if current score is better
    if (playerScoreValue < this.playerBestScore()) {
      this.playerBestScore.set(playerScoreValue);

      // Save to backend if user is logged in
      const currentUserValue = this.currentUser();
      if (this.isLoggedIn() && currentUserValue?.id) {
        const newBestScore: PlaygroundBestScore = {
          user_id: currentUserValue.id,
          username: currentUserValue.username,
          image: currentUserValue.image ?? "",
          best_score: playerScoreValue,
          best_date: new Date(),
        };
        this.playgroundService.setUserBestScore(newBestScore);
      }
    }
  }

  async lightsUp(): Promise<void> {
    const bulbs = this.bulbs ?? document.querySelectorAll<HTMLElement>('.bulb');

    for (const bulb of Array.from(bulbs)) {
      if (this.hasJumpStart()) {
        break;
      }
      bulb.classList.add('red_light');
      await sleep(1000);
    }

    if ( !this.hasJumpStart() ) {
      const maxRandomDelay = 4000; 
      const minRandomDelay = 500;
      const randomDelay = Math.floor(Math.random() * (maxRandomDelay - minRandomDelay + 1)) + minRandomDelay;
      await sleep(randomDelay);
    }

    if ( !this.hasJumpStart() ) {
      this.lightsOut();
    }

    this.hasJumpStart.set(false); 
  }

  lightsOut(): void {
    const bulbs = this.bulbs ?? document.querySelectorAll<HTMLElement>('.bulb');

    for (const bulb of Array.from(bulbs)) {
      bulb.classList.remove('red_light');
    }

    this.isTimerStarted.set(true);
    this.timerStartTime = Date.now();
  }

  async lightsError(): Promise<void> {
    const bulbs = this.bulbs ?? document.querySelectorAll<HTMLElement>('.bulb');

    this.hasLightsError.set(true);

    for (let i = 0; i < 3; i++) {
      for (const bulb of Array.from(bulbs)) {
        bulb.classList.add('red_light');
      }

      await sleep(500);

      for (const bulb of Array.from(bulbs)) {
        bulb.classList.remove('red_light');
      }

      await sleep(500);
    }

    this.resetGameText();

    this.hasLightsError.set(false);
  }

  getAvatar(userId: number, image?: string): string {
    if (image) 
      {return `data:image/jpeg;base64,${image}`;}
    
    // Fallback to file path
    return `./assets/images/avatars_fanta/${userId}.png`;
  }

  resetGameText(): void {
    this.playerStatus.set(`SEI PRONTO?`);
    if ( this.#colorModeService.colorMode.name === 'dark' ) {
      this.playerStatusColor.set("#FFFFFF");
    } else {
      this.playerStatusColor.set("#000000"); 
    }
  }


}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
