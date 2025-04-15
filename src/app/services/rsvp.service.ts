import { Injectable } from '@angular/core';
import {
  Player,
  RsvpEntry,
  RsvpStatus,
  RsvpCounts,
} from '../models/rsvp.models';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class RsvpService {
  private rsvpEntries: RsvpEntry[] = [];

  constructor(private logger: LoggerService) {}

  addOrUpdateRsvp(player: Player, status: RsvpStatus): RsvpEntry {
    if (!player || !player.id) {
      this.logger.error('Invalid player provided');
      throw new Error('Valid player is required');
    }

    const existingIndex = this.rsvpEntries.findIndex(
      (entry) => entry.player.id === player.id
    );

    const newEntry: RsvpEntry = {
      player,
      status,
      responseDate: new Date(),
    };

    if (existingIndex >= 0) {
      this.rsvpEntries[existingIndex] = newEntry;
      this.logger.info(
        `Updated RSVP for player: ${player.name} with status: ${status}`
      );
    } else {
      this.rsvpEntries.push(newEntry);
      this.logger.info(
        `Added new RSVP for player: ${player.name} with status: ${status}`
      );
    }

    return newEntry;
  }

  getConfirmedAttendees(): Player[] {
    return this.rsvpEntries
      .filter((entry) => entry.status === 'Yes')
      .map((entry) => entry.player);
  }

  getAllRsvps(): RsvpEntry[] {
    return [...this.rsvpEntries];
  }

  getRsvpCounts(): RsvpCounts {
    const counts: RsvpCounts = {
      total: this.rsvpEntries.length,
      confirmed: 0,
      declined: 0,
      maybe: 0,
    };

    this.rsvpEntries.forEach((entry) => {
      if (entry.status === 'Yes') {
        counts.confirmed++;
      } else if (entry.status === 'No') {
        counts.declined++;
      } else {
        counts.maybe++;
      }
    });

    return counts;
  }

  initializeWithRsvps(entries: RsvpEntry[]): void {
    if (!entries || !Array.isArray(entries)) {
      return;
    }

    this.rsvpEntries = [...entries];
    this.logger.info(`Initialized with ${entries.length} RSVP entries`);
  }
}
