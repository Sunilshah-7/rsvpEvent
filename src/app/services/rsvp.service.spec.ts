import { TestBed } from '@angular/core/testing';
import { RsvpService } from './rsvp.service';
import { LoggerService } from './logger.service';
import { Player, RsvpEntry } from '../models/rsvp.models';

describe('RsvpService', () => {
  let service: RsvpService;
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  const mockPlayers: Player[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoggerService', [
      'log',
      'error',
      'warn',
      'info',
    ]);

    TestBed.configureTestingModule({
      providers: [RsvpService, { provide: LoggerService, useValue: spy }],
    });

    service = TestBed.inject(RsvpService);
    loggerSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it('should add a new RSVP entry', () => {
    service.addOrUpdateRsvp(mockPlayers[0], 'Yes');

    const allRsvps = service.getAllRsvps();
    expect(allRsvps.length).toBe(1);
    expect(allRsvps[0].player.id).toBe(mockPlayers[0].id);
    expect(allRsvps[0].status).toBe('Yes');
  });

  it('should update an existing RSVP entry', () => {
    service.addOrUpdateRsvp(mockPlayers[0], 'Yes');
    service.addOrUpdateRsvp(mockPlayers[0], 'No');

    const allRsvps = service.getAllRsvps();
    expect(allRsvps.length).toBe(1);
    expect(allRsvps[0].status).toBe('No');
  });

  it('should get confirmed attendees correctly', () => {
    service.addOrUpdateRsvp(mockPlayers[0], 'Yes');
    service.addOrUpdateRsvp(mockPlayers[1], 'No');
    service.addOrUpdateRsvp(mockPlayers[2], 'Yes');

    const confirmedAttendees = service.getConfirmedAttendees();
    expect(confirmedAttendees.length).toBe(2);
    expect(confirmedAttendees[0].id).toBe(mockPlayers[0].id);
    expect(confirmedAttendees[1].id).toBe(mockPlayers[2].id);
  });

  it('should count RSVPs correctly', () => {
    service.addOrUpdateRsvp(mockPlayers[0], 'Yes');
    service.addOrUpdateRsvp(mockPlayers[1], 'No');
    service.addOrUpdateRsvp(mockPlayers[2], 'Maybe');

    const counts = service.getRsvpCounts();
    expect(counts.total).toBe(3);
    expect(counts.confirmed).toBe(1);
    expect(counts.declined).toBe(1);
    expect(counts.maybe).toBe(1);
  });
});
