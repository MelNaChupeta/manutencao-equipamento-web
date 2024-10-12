import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Interceptor } from './config/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes) , 
    provideHttpClient(withInterceptorsFromDi()) ,
      { 
        provide: HTTP_INTERCEPTORS, 
        useClass: Interceptor, 
        multi: true 
      }
  ]
};
