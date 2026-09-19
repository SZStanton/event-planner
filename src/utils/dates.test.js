import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  toDateValue,
  today,
  currentTime,
  eventDateTime,
  hasPassed,
  formatDate,
} from './dates';

afterEach(() => {
  vi.useRealTimers();
});

describe('the suite itself', () => {
  // Guards the config. Every test below passes at UTC+2 whether the code is
  // right or wrong, so a suite that quietly loses its timezone proves nothing.
  it('runs at a negative UTC offset', () => {
    expect(
      new Date('2026-01-15T12:00:00Z').getTimezoneOffset(),
    ).toBeGreaterThan(0);
  });
});

describe('toDateValue', () => {
  it('formats a date as the value a date input expects', () => {
    expect(toDateValue(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('pads single digit months and days', () => {
    expect(toDateValue(new Date(2026, 8, 9))).toBe('2026-09-09');
  });
});

describe('today', () => {
  it('reads the local date, not the UTC one', () => {
    // 02:00 UTC on the 15th is still the evening of the 14th in New York.
    // toISOString() would answer 2026-01-15 here, which is the original bug.
    vi.setSystemTime(new Date('2026-01-15T02:00:00Z'));
    expect(today()).toBe('2026-01-14');
  });

  it('agrees with local time when the two dates match', () => {
    vi.setSystemTime(new Date('2026-01-15T17:00:00Z'));
    expect(today()).toBe('2026-01-15');
  });
});

describe('currentTime', () => {
  it('reads local time, padded to HH:MM', () => {
    // 13:05 UTC is 08:05 in New York.
    vi.setSystemTime(new Date('2026-01-15T13:05:00Z'));
    expect(currentTime()).toBe('08:05');
  });
});

describe('eventDateTime', () => {
  it('reads an event as local time rather than UTC', () => {
    const at = eventDateTime({ date: '2026-01-15', time: '09:30' });
    expect(at.getFullYear()).toBe(2026);
    expect(at.getDate()).toBe(15);
    expect(at.getHours()).toBe(9);
  });

  it('treats a missing time as midnight', () => {
    expect(eventDateTime({ date: '2026-01-15', time: '' }).getHours()).toBe(0);
  });
});

describe('hasPassed', () => {
  it('is true for an event earlier today', () => {
    vi.setSystemTime(new Date('2026-01-15T18:00:00Z')); // 13:00 local
    expect(hasPassed({ date: '2026-01-15', time: '09:00' })).toBe(true);
  });

  it('is false for an event later today', () => {
    vi.setSystemTime(new Date('2026-01-15T18:00:00Z')); // 13:00 local
    expect(hasPassed({ date: '2026-01-15', time: '20:00' })).toBe(false);
  });
});

describe('formatDate', () => {
  it('does not shift the day backwards', () => {
    // A date-only string parses as UTC midnight, which is the previous evening
    // anywhere west of Greenwich. The 15th must not read as the 14th.
    const text = formatDate('2026-01-15');
    expect(text).toContain('15');
    expect(text).not.toContain('14');
  });
});
