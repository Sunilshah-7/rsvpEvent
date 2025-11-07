import {
  ApplicationConfig,
  PLATFORM_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServerRendering(),
  ],
};

export const config = serverConfig;
