import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

/**
 * This service offers a way to push results of changed done by the user (i.e. changing the photo profile or adding a new product)
 * via actionResultsSubject
 * so that components who listen to changes via actionResults can show the action outcome as preferred (i.e. via toaster or via dialog)
 */
@Injectable({
  providedIn: 'root'
})
export class UserActionNotificationService {

  /** 
   * subject to publish ActionResult instances 
   */
  actionResultsSubject = new Subject<ActionResult>();
  /**
   * observable that emit ActionResult published on actionResultsSubject
   */
  actionResults: Observable<ActionResult> = this.actionResultsSubject.asObservable();

  
  constructor() { }

  /**
   * use this method to subscribe to ActionResult instances
   * @param next handler when a new ActionResult is published
   * @returns the subscription
   */
  subscribe(next: (value: ActionResult) => any): Subscription {
    return this.actionResults.subscribe(next);
  }

  /**
   * user this method whenever you want to comunicate the result of a user action via an ActionResult object (for example a backend call)
   * @param value ActionResult to publish
   */
  pushNotification(value: ActionResult) {
    this.actionResultsSubject.next(value);
  }

}

export enum Result {
  ERROR = 'danger',
  SUCCESS = 'success'
} 

export class ActionResult {
  constructor(readonly result: Result, readonly message: string, readonly title?: string) {}
}