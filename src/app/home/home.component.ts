import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RsvpService } from '../services/rsvp.service';
import {
  Player,
  RsvpEntry,
  RsvpCounts,
  RsvpStatus,
} from '../models/rsvp.models';
import { RsvpFormComponent } from './rsvp-form/rsvp-form.component';
import { RsvpListComponent } from './rsvp-list/rsvp-list.component';
import { RsvpStatsComponent } from './rsvp-stats/rsvp-stats.component';
import { ConfirmedAttendeesComponent } from './confirmed-attendees/confirmed-attendees.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RsvpFormComponent,
    RsvpListComponent,
    RsvpStatsComponent,
    ConfirmedAttendeesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rsvpEntries: RsvpEntry[] = [];
  confirmedAttendees: Player[] = [];
  rsvpCounts: RsvpCounts = { total: 0, confirmed: 0, declined: 0, maybe: 0 };

  constructor(private rsvpService: RsvpService) {}

  ngOnInit(): void {
    this.loadRsvpData();
    this.initializeWithSampleData();
  }

  loadRsvpData(): void {
    this.rsvpEntries = this.rsvpService.getAllRsvps();
    this.confirmedAttendees = this.rsvpService.getConfirmedAttendees();
    this.rsvpCounts = this.rsvpService.getRsvpCounts();
  }

  handleRsvpSubmitted(data: { player: Player; status: RsvpStatus }): void {
    this.rsvpService.addOrUpdateRsvp(data.player, data.status);
    this.loadRsvpData();
  }

  private initializeWithSampleData(): void {
    if (this.rsvpEntries.length === 0) {
      const samplePlayers: Player[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
      ];

      this.rsvpService.addOrUpdateRsvp(samplePlayers[0], 'Yes');
      this.rsvpService.addOrUpdateRsvp(samplePlayers[1], 'No');
      this.rsvpService.addOrUpdateRsvp(samplePlayers[2], 'Maybe');

      this.loadRsvpData();
    }
  }
}
