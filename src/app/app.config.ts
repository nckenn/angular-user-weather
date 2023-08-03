import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  USER_API_URL,
  WEATHER_API_URL,
} from './shared/data-access/api/api-url.token';
import { HotToastModule } from '@ngneat/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: USER_API_URL, useValue: environment.user_api_url },
    { provide: WEATHER_API_URL, useValue: environment.weather_api_url },
    importProvidersFrom(HotToastModule.forRoot()),
  ],
};
