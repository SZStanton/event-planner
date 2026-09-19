import { useState } from 'react';
import { today } from '../utils/dates';

//=== EVENT FORM COMPONENT ===
// Reusable form used for both AddEvent and EditEvent pages
function EventForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save Event',
  errorMessage,
  minDate = today(),
}) {
  // Local form state (controlled inputs). Reads initialValues once, so callers
  // editing a record pass a key to remount the form when the record changes.
  const [formData, setFormData] = useState(initialValues);

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="card p-4 shadow-sm event-form" onSubmit={handleSubmit}>
      {/* Error message */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Event Name */}
      <div className="mb-3">
        <label className="form-label">Event Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter event name"
        />
      </div>

      {/* Date */}
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={minDate}
        />
      </div>

      {/* Time */}
      <div className="mb-3">
        <label className="form-label">Time</label>
        <input
          type="time"
          className="form-control"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>

      {/* Location */}
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter event location"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="form-label">Description</label>
        <textarea
          rows="4"
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter event description"
        />
      </div>

      {/* Submit button */}
      <button className="btn btn-primary">{submitLabel}</button>
    </form>
  );
}

export default EventForm;

