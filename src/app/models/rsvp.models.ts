export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface Player {
  id: string;
  name: string;
  email?: string;
}

export interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
  responseDate: Date;
}

export interface RsvpCounts {
  total: number;
  confirmed: number;
  declined: number;
  maybe: number;
}