import  Aura  from '@primeng/themes/aura';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { AuthInterceptor } from './auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
export const appConfig: ApplicationConfig = {
  providers: [
   provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    CookieService,
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes), provideClientHydration(withEventReplay())

  ]
};


