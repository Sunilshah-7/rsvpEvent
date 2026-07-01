import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Player } from '../../models/rsvp.models';

@Component({
  selector: 'app-confirmed-attendees',
  standalone: true,
  imports: [],
  templateUrl: './confirmed-attendees.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./confirmed-attendees.component.scss']
})
export class ConfirmedAttendeesComponent {
  @Input() attendees: Player[] = [];
}