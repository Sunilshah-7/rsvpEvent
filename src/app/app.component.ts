import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: `
    <main>
      <app-home></app-home>
    </main>
  `,
  styles: [
    `
      main {
        background-color: #f5f7fa;
        min-height: 100vh;
      }
    `,
  ],
})
export class AppComponent {}
