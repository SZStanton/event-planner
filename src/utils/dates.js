// Date helpers for the app. Everything here works in local time.
//
// toISOString() returns the UTC date, which is a day behind local time for part
// of every evening east of Greenwich. Using it for "today" lets an event that
// has already passed slip through validation.

const pad = value => String(value).padStart(2, '0');

// Format a Date as the YYYY-MM-DD a date input expects.
function toDateValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Today's date, in the visitor's timezone rather than UTC.
function today() {
  return toDateValue(new Date());
}

// The current time as the HH:MM a time input expects.
function currentTime() {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

// Combine an event's date and time into one Date. No trailing Z, so the browser
// reads it as local.
function eventDateTime(event) {
  return new Date(`${event.date}T${event.time || '00:00'}`);
}

// Whether an event's start has already passed.
function hasPassed(event) {
  return eventDateTime(event) < new Date();
}

// A YYYY-MM-DD value written out for reading, in the visitor's own locale.
function formatDate(value) {
  return new Date(`${value}T00:00`).toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export {
  toDateValue,
  today,
  currentTime,
  eventDateTime,
  hasPassed,
  formatDate,
};
