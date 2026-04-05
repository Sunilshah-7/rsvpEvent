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
  private maxCapacity = 2;

  constructor(private logger: LoggerService) {}

  addOrUpdateRsvp(player: Player, status: RsvpStatus): RsvpEntry {
    if (!player || !player.id) {
      this.logger.error('Invalid player provided');
      throw new Error('Valid player is required');
    }

    const existingIndex = this.rsvpEntries.findIndex(
      (entry) => entry.player.id === player.id,
    );

    const newEntry: RsvpEntry = {
      player,
      status,
      responseDate: new Date(),
      isWaitlisted: false,
      waitlistPosition: null,
    };

    if (existingIndex >= 0) {
      this.rsvpEntries[existingIndex] = newEntry;
      this.logger.info(
        `Updated RSVP for player: ${player.name} with status: ${status}`,
      );
    } else {
      this.rsvpEntries.push(newEntry);
      this.logger.info(
        `Added new RSVP for player: ${player.name} with status: ${status}`,
      );
    }

    this.recalculateCapacityAssignments();

    return (
      this.rsvpEntries.find((entry) => entry.player.id === player.id) ??
      newEntry
    );
  }

  getConfirmedAttendees(): Player[] {
    return this.rsvpEntries
      .filter((entry) => entry.status === 'Yes' && !entry.isWaitlisted)
      .map((entry) => entry.player);
  }

  getWaitlistedEntries(): RsvpEntry[] {
    return this.rsvpEntries
      .filter((entry) => entry.status === 'Yes' && entry.isWaitlisted)
      .sort(
        (a, b) =>
          (a.waitlistPosition ?? Number.MAX_SAFE_INTEGER) -
          (b.waitlistPosition ?? Number.MAX_SAFE_INTEGER),
      );
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
      waitlisted: 0,
      capacity: this.maxCapacity,
      availableSpots: this.maxCapacity,
    };

    this.rsvpEntries.forEach((entry) => {
      if (entry.status === 'Yes') {
        if (entry.isWaitlisted) {
          counts.waitlisted++;
        } else {
          counts.confirmed++;
        }
      } else if (entry.status === 'No') {
        counts.declined++;
      } else {
        counts.maybe++;
      }
    });

    counts.availableSpots = Math.max(counts.capacity - counts.confirmed, 0);

    return counts;
  }

  getCapacity(): number {
    return this.maxCapacity;
  }

  setCapacity(capacity: number): void {
    if (!Number.isInteger(capacity) || capacity < 1) {
      this.logger.error('Invalid capacity provided');
      throw new Error('Capacity must be a positive integer');
    }

    this.maxCapacity = capacity;
    this.recalculateCapacityAssignments();
    this.logger.info(`Updated event capacity to ${capacity}`);
  }

  initializeWithRsvps(entries: RsvpEntry[]): void {
    if (!entries || !Array.isArray(entries)) {
      return;
    }

    this.rsvpEntries = entries.map((entry) => ({
      ...entry,
      isWaitlisted: entry.isWaitlisted ?? false,
      waitlistPosition: entry.waitlistPosition ?? null,
    }));
    this.recalculateCapacityAssignments();
    this.logger.info(`Initialized with ${entries.length} RSVP entries`);
  }

  private recalculateCapacityAssignments(): void {
    const yesEntries = this.rsvpEntries
      .filter((entry) => entry.status === 'Yes')
      .sort(
        (a, b) =>
          new Date(a.responseDate).getTime() -
          new Date(b.responseDate).getTime(),
      );

    const confirmedIds = new Set(
      yesEntries.slice(0, this.maxCapacity).map((entry) => entry.player.id),
    );

    let nextWaitlistPosition = 1;

    this.rsvpEntries = this.rsvpEntries.map((entry) => {
      if (entry.status !== 'Yes') {
        return {
          ...entry,
          isWaitlisted: false,
          waitlistPosition: null,
        };
      }

      if (confirmedIds.has(entry.player.id)) {
        return {
          ...entry,
          isWaitlisted: false,
          waitlistPosition: null,
        };
      }

      return {
        ...entry,
        isWaitlisted: true,
        waitlistPosition: nextWaitlistPosition++,
      };
    });
  }
}
