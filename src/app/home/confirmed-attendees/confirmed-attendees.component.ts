import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/rsvp.models';

@Component({
  selector: 'app-confirmed-attendees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmed-attendees.component.html',
  styleUrls: ['./confirmed-attendees.component.scss']
})
export class ConfirmedAttendeesComponent {
  @Input() attendees: Player[] = [];
}