import { Injectable } from '@angular/core';
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable()
export class LocalStorageService extends LocalStorageServiceService {

  constructor() {
    super({
      clear: () => { },
      getItem: (key: string) => JSON.stringify({ key }),
      setItem: (key: string, value: string) => JSON.stringify({ [key]: value }),
      key: (index: number) => index.toString(),
      length: 0,
      removeItem: (key: string) => JSON.stringify({ key }),
    });
  }
}

