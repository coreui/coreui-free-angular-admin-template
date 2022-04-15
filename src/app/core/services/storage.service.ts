import { Injectable } from '@angular/core';
import { keepUnstableUntilFirst } from '@angular/fire';
import { FirebaseStorage, getDownloadURL, getStorage, percentage, ref, StorageReference, uploadBytes, uploadBytesResumable, UploadTask, UploadTaskSnapshot } from '@angular/fire/storage';
import { concatMap, from, map, Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private afStorage: FirebaseStorage;

  constructor() { 
    this.afStorage = getStorage();
  }

  uploadImage(path: string, file: File): [Observable<number>, Observable<UploadTaskSnapshot>]{
    const reference: StorageReference = ref(this.afStorage, path);
    
    const task: UploadTask = uploadBytesResumable(reference, file);
    
    const progress$: Observable<number> = percentage(task).pipe(map(value => value.progress));
    const snapshot$: Observable<UploadTaskSnapshot> = percentage(task).pipe(map(value => value.snapshot));
    return [progress$, snapshot$];
  }
}
