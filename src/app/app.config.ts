import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LocalStorageServiceService } from './service/localStorage/local-storage-service.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './service/auth/auth.interceptor';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    LocalStorageServiceService, provideHttpClient(), graphqlProvider
  ]
};
