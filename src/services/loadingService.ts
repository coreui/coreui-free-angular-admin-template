import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class LoadingService {
    private _loading = new BehaviorSubject<boolean>(false);
    private _loaded = new BehaviorSubject<boolean>(true);
    public readonly loading$ = this._loading.asObservable();
    public readonly loaded$ = this._loaded.asObservable();
  
    constructor() {}
  
    show() {
      this._loading.next(true);
      this._loaded.next(false);
    }
  
    hide() {
      this._loading.next(false);
      this._loaded.next(true);
    }
  }