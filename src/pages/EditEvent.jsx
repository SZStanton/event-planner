import { useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';
import PageHeading from '../components/PageHeading';
import { today } from '../utils/dates';
import validateEvent from '../utils/validateEvent';

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
  const todayValue = today();
  const earliest = event.date < todayValue ? event.date : todayValue;

  // Handle form submission
  const handleSubmit = formData => {
    const message = validateEvent(formData, earliest);

    if (message) {
      setError(message);
      return;
    }

    // Update event in context
    updateEvent(id, formData);
    // Return to dashboard
    navigate('/');
  };

  return (
    <>
      <PageHeading title="Edit Event" subtitle="Update your existing event" />

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
    </>
  );
}

export default EditEvent;
