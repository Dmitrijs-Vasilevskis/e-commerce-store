import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LocalStorageService } from './service/localStorage/local-storage.service';
import { LocalStorageServiceService } from './service/localStorage/local-storage-service.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: LocalStorageServiceService,
      useClass: LocalStorageService
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
