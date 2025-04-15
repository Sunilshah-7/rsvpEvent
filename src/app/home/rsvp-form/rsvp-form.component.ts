import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player, RsvpStatus } from '../../models/rsvp.models';

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.scss']
})
export class RsvpFormComponent {
  @Output() rsvpSubmitted = new EventEmitter<{player: Player, status: RsvpStatus}>();
  
  rsvpForm: FormGroup;
  rsvpStatuses: RsvpStatus[] = ['Yes', 'No', 'Maybe'];
  
  constructor(private fb: FormBuilder) {
    this.rsvpForm = this.fb.group({
      playerId: ['', Validators.required],
      playerName: ['', Validators.required],
      playerEmail: ['', [Validators.email]],
      status: ['Yes', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.rsvpForm.valid) {
      const formValue = this.rsvpForm.value;
      
      const player: Player = {
        id: formValue.playerId,
        name: formValue.playerName,
        email: formValue.playerEmail
      };
      
      this.rsvpSubmitted.emit({
        player,
        status: formValue.status as RsvpStatus
      });
      
      this.rsvpForm.reset({
        status: 'Yes'
      });
    }
  }
}