import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  cache: any = {};

  constructor() {
    this.cache = JSON.parse(localStorage.getItem('_persisted') ?? '{}');
  }

  set(name: string, value: any, persist: boolean = false) {
    this.cache[name] = value;

    if (persist) {
      const persisted = JSON.parse(localStorage.getItem('_persisted') ?? '{}');
      persisted[name] = value;
      localStorage.setItem('_persisted', JSON.stringify(persisted));
    }
  }

  get<T>(name: string): T {
    return this.cache[name];
  }
}
