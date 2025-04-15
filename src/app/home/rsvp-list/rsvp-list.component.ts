import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player, RsvpEntry, RsvpStatus } from '../../models/rsvp.models';

@Component({
  selector: 'app-rsvp-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsvp-list.component.html',
  styleUrls: ['./rsvp-list.component.scss'],
})
export class RsvpListComponent {
  @Input() entries: RsvpEntry[] = [];
  @Output() updateRsvp = new EventEmitter<{
    player: Player;
    status: RsvpStatus;
  }>();

  statusClasses = {
    Yes: 'status-yes',
    No: 'status-no',
    Maybe: 'status-maybe',
  };

  getStatusClass(status: RsvpStatus): string {
    return this.statusClasses[status] || '';
  }

  changeStatus(entry: RsvpEntry, newStatus: RsvpStatus): void {
    if (entry.status !== newStatus) {
      this.updateRsvp.emit({
        player: entry.player,
        status: newStatus,
      });
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
