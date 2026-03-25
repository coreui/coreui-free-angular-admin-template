import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSignal = signal<boolean>(false);
  private callNumber = 0;
  public readonly loading = this.loadingSignal.asReadonly();

  show() {
    if (this.callNumber === 0) {this.loadingSignal.set(true);}
    this.callNumber++;
  }

  hide() {
    if(this.callNumber > 0) {this.callNumber--;}
    if(this.callNumber === 0) {this.loadingSignal.set(false);}
  }
}