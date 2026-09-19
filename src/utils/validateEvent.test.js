import { describe, expect, it } from 'vitest';
import validateEvent from './validateEvent';

const good = {
  name: 'Team retro',
  date: '2026-01-20',
  time: '14:00',
  location: 'Video call',
  description: 'Close out the sprint.',
};

describe('validateEvent', () => {
  it('accepts a filled form dated on or after the earliest day', () => {
    expect(validateEvent(good, '2026-01-15')).toBe('');
    expect(validateEvent(good, '2026-01-20')).toBe('');
  });

  it('rejects an empty field', () => {
    expect(validateEvent({ ...good, name: '' }, '2026-01-15')).toBe(
      'Please fill in all fields.',
    );
  });

  // The context trims on save, so untrimmed rules let a space through and then
  // store a blank field. On edit that silently wipes a real event.
  it.each(['name', 'location', 'description'])(
    'rejects a %s of whitespace only',
    field => {
      expect(validateEvent({ ...good, [field]: '   ' }, '2026-01-15')).toBe(
        'Please fill in all fields.',
      );
    },
  );

  it('rejects a date before the earliest allowed day', () => {
    expect(validateEvent(good, '2026-01-21')).toBe(
      'Event date cannot be in the past.',
    );
  });

  it('reports the empty field before the date, so the message fits the fault', () => {
    const blankAndPast = { ...good, name: '', date: '2020-01-01' };
    expect(validateEvent(blankAndPast, '2026-01-15')).toBe(
      'Please fill in all fields.',
    );
  });
});
