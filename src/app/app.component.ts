import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
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
