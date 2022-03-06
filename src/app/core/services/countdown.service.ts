import { Injectable } from '@angular/core';
import { map, Observable, takeWhile, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  countDown(callback: () => void, 
  from: number = 5,
  initialDelayInSeconds: number = 0,
  intervalInSec: number =1): Observable<number> {
    const countDownTimer = timer(initialDelayInSeconds*1000, intervalInSec*1000);
    return countDownTimer.pipe(
      map(i => from-i),
      tap({next: (val) => {
        if(val === -1) callback();
      }}),
      takeWhile((val,index) => val >= -1)
    );
  }
}
