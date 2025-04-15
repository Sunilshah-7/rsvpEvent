import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsvpCounts } from '../../models/rsvp.models';

@Component({
  selector: 'app-rsvp-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsvp-stats.component.html',
  styleUrls: ['./rsvp-stats.component.scss'],
})
export class RsvpStatsComponent {
  @Input() counts: RsvpCounts = {
    total: 0,
    confirmed: 0,
    declined: 0,
    maybe: 0,
  };

  get confirmedPercentage(): number {
    return this.counts.total
      ? Math.round((this.counts.confirmed / this.counts.total) * 100)
      : 0;
  }

  get declinedPercentage(): number {
    return this.counts.total
      ? Math.round((this.counts.declined / this.counts.total) * 100)
      : 0;
  }

  get maybePercentage(): number {
    return this.counts.total
      ? Math.round((this.counts.maybe / this.counts.total) * 100)
      : 0;
  }
}
