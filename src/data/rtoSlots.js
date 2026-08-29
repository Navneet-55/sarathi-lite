/**
 * RTO Offices and Available Slots Data Fixtures
 */
export const RTO_OFFICES = [
  { code: 'KA-01', name: 'RTO Bengaluru Central (Koramangala)' },
  { code: 'KA-03', name: 'RTO Bengaluru East (Indiranagar)' },
  { code: 'KA-04', name: 'RTO Bengaluru North (Yelahanka)' },
  { code: 'KA-05', name: 'RTO Bengaluru South (Jayanagar)' },
  { code: 'KA-51', name: 'RTO Electronic City' },
];

export const INITIAL_SLOTS = [
  { id: 's1', date: '2026-09-02', time: '09:30 AM', rto: 'RTO Bengaluru South (KA-05)', seats: 12, window: 'Morning' },
  { id: 's2', date: '2026-09-02', time: '11:30 AM', rto: 'RTO Bengaluru South (KA-05)', seats: 6, window: 'Morning' },
  { id: 's3', date: '2026-09-03', time: '02:00 PM', rto: 'RTO Bengaluru Central (KA-01)', seats: 18, window: 'Afternoon' },
  { id: 's4', date: '2026-09-03', time: '03:30 PM', rto: 'RTO Bengaluru East (KA-03)', seats: 15, window: 'Afternoon' },
  { id: 's5', date: '2026-09-04', time: '10:00 AM', rto: 'RTO Bengaluru South (KA-05)', seats: 8, window: 'Morning' },
  { id: 's6', date: '2026-09-05', time: '01:30 PM', rto: 'RTO Electronic City (KA-51)', seats: 22, window: 'Afternoon' },
];

/**
 * Ranks slots based on applicant's target RTO and preference
 */
export function rankSlots(slots, userRto, preference = 'morning') {
  return slots.map((slot) => {
    let score = 70;
    const reasons = [];

    if (slot.rto.toLowerCase().includes(userRto?.toLowerCase() || 'south')) {
      score += 20;
      reasons.push('Matches your registered RTO location');
    }

    if (slot.window.toLowerCase() === preference.toLowerCase()) {
      score += 10;
      reasons.push(`${slot.window} slot fits preference`);
    }

    if (slot.seats > 10) {
      score += 5;
      reasons.push('High seat availability');
    }

    return {
      slotId: slot.id,
      score: Math.min(score, 99),
      reason: reasons.join(' • ') || 'Standard available appointment slot',
    };
  });
}
