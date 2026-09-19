// One owner for the event form rules, so the two pages cannot drift apart.
// Returns an error message, or an empty string when the form is good.
function validateEvent(formData, earliest) {
  const { name, date, time, location, description } = formData;

  // Trim before checking. The context trims on save, so whitespace alone would
  // otherwise pass this guard and store a blank field.
  if (
    !name.trim() ||
    !date ||
    !time ||
    !location.trim() ||
    !description.trim()
  ) {
    return 'Please fill in all fields.';
  }

  if (date < earliest) {
    return 'Event date cannot be in the past.';
  }

  return '';
}

export default validateEvent;
