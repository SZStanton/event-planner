import { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';
import { today } from '../utils/dates';

//=== EDIT EVENT PAGE ===
// Allows users to edit existing event
function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent, updateEvent } = useEvents();
  const [error, setError] = useState('');

  const event = getEvent(id);

  // Redirect declaratively, rather than rendering an empty form for one frame
  // and then bouncing from an effect.
  if (!event) {
    return <Navigate to="/" replace />;
  }

  // An event that has already happened can still be corrected, but no event can
  // be moved further into the past.
  const earliest = event.date < today() ? event.date : today();

  // Handle form submission
  const handleSubmit = formData => {
    const { name, date, time, location, description } = formData;

    // Check for empties first. An empty date sorts below every real one, so the
    // past check would otherwise blame the wrong field.
    if (!name || !date || !time || !location || !description) {
      setError('Please fill in all fields.');
      return;
    }

    if (date < earliest) {
      setError('Event date cannot be in the past.');
      return;
    }

    // Update event in context
    updateEvent(id, formData);
    // Return to dashboard
    navigate('/');
  };

  return (
    <div className="container py-4">
      {/* Page heading */}
      <div className="mb-4">
        <h2>Edit Event</h2>
        <p className="text-muted mb-0">Update your existing event</p>
      </div>

      {/* Event form */}
      <EventForm
        key={event.id}
        initialValues={{
          name: event.name,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
        }}
        onSubmit={handleSubmit}
        submitLabel="Update Event"
        errorMessage={error}
        minDate={earliest}
      />
    </div>
  );
}

export default EditEvent;
