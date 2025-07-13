import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { QCPreset } from './app.preset';
import { ErrorHandlerInterceptor } from './shared/interceptors/server-error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    providePrimeNG({
      theme: {
        preset: QCPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          },
          darkModeSelector: '.my-app-dark'
        }        
      },
      ripple: true
    }),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ]
};
