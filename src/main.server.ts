import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(
    AppComponent,
    { ...config, providers: [provideZoneChangeDetection(), ...config.providers] },
    context,
  ).catch((err) => {
    console.error('Failed to bootstrap:', err);
    throw err;
  });
}
