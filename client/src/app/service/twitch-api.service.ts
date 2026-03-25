import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { TwitchStreamResponse } from '@f123dashboard/shared';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TwitchApiService {
  private apiService = inject(ApiService);
  private channelId = 'dreandos';
  private isLiveSignal = signal<boolean>(false);
  public readonly isLive = this.isLiveSignal.asReadonly();
  private twitchStreamResponse: TwitchStreamResponse |null = null;

  async checkStreamStatus(){
    this.twitchStreamResponse = await firstValueFrom(
      this.apiService.post<TwitchStreamResponse>('/twitch/stream-info', { channelName: this.channelId })
    );
    this.isLiveSignal.set(this.twitchStreamResponse && this.twitchStreamResponse.data.length > 0);
  }
  
  getChannel(): string {
    return this.channelId;
  }

}