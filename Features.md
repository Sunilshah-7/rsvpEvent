# High-impact features to add next, in priority order:

1. Capacity + waitlist

- Set a max attendee count
- Auto-move overflow RSVPs to waitlist
- Promote waitlisted users when someone cancels
- Why: this is the most realistic event workflow and adds useful logic

2. RSVP edit and cancellation flow

- Add "edit my RSVP" (name, guests, dietary notes)
- Add cancellation with confirmation
- Track timestamps for created/updated/cancelled
- Why: users always need to fix mistakes after submitting

3. Email notifications

- Confirmation email after RSVP
- Reminder email 24h before event
- Optional waitlist/promotion email
- Why: major UX win and makes it feel production-ready

4. Duplicate detection + anti-spam

- Detect duplicates by email/phone
- Basic rate limiting for repeated submissions
- Honeypot field for bot protection
- Why: improves data quality and avoids garbage RSVPs

5. Admin dashboard

- Search/filter attendees
- Export CSV
- Quick actions: confirm, cancel, move waitlist
- Why: operationally essential if event organizers are real users

6. Rich RSVP analytics

- Daily RSVP trend chart
- Attendance probability forecast
- Guest count and dietary stats
- Why: strong demo value and helps planning decisions

7. Check-in mode for event day

- Mobile-friendly attendee lookup
- One-tap "checked in"
- Live attendance counter
- Why: closes the loop from registration to event execution

8. Multi-event support

- Host multiple events in one app
- Event-specific settings (capacity, date, form fields)
- Why: turns this into a reusable platform, not a one-off app

9. Custom form fields

- Add per-event fields (company, accessibility needs, meal preference)
- Required/optional validation controls
- Why: gives flexibility without code changes

10. Authentication + roles

- Public attendee flow
- Organizer/admin login
- Role-based permissions for dashboard actions
- Why: needed before real deployment

## Best quick roadmap for next sprint

1. Capacity + waitlist
2. RSVP edit/cancel
3. Admin dashboard basic version
4. CSV export
5. Email confirmations
