import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
