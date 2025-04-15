import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string, error?: any): void {
    console.error(`[ERROR]: ${message}`, error || '');
  }

  warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  info(message: string): void {
    console.info(`[INFO]: ${message}`);
  }
}