import { Pipe, PipeTransform } from '@angular/core';
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Pipe({
  name: 'firebaseDate'
})
export class FirebaseDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): Date {
    return (value as unknown as Timestamp).toDate();
  }

}
