import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeProfileNotificationService {

    // Backend notifications via toaster
  // subject
  actionResultsSubject = new Subject<ActionResult>();
  actionResults: Observable<ActionResult> = this.actionResultsSubject.asObservable();

  
  constructor() { }

  subscribe(next: (value: ActionResult) => any): Subscription {
    return this.actionResults.subscribe(next);
  }

  pushNotification(value: ActionResult) {
    this.actionResultsSubject.next(value);
  }

}

export enum Result {
  ERROR = 'danger',
  SUCCESS = 'success'
} 

export class ActionResult {
  constructor(readonly result: Result, readonly message: string) {}
}