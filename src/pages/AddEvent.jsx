import { useState } from 'react';
import { useNavigate } from 'react-router';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';
import PageHeading from '../components/PageHeading';
import { today, currentTime } from '../utils/dates';
import validateEvent from '../utils/validateEvent';

//=== ADD EVENT PAGE ===
// Allows users to create a new event
function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // The form and the validator take the same bound, so it is named once.
  const earliest = today();

  // Handle form submit
  const handleSubmit = formData => {
    const message = validateEvent(formData, earliest);

    if (message) {
      setError(message);
      return;
    }

    // Add new event to context
    addEvent(formData);

    // Redirect back to dashboard
    navigate('/');
  };

  return (
    <>
      <PageHeading title="Add Event" subtitle="Create a new event" />

      <EventForm
        initialValues={{
          name: '',
          date: earliest,
          time: currentTime(),
          location: '',
          description: '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Event"
        errorMessage={error}
        minDate={earliest}
      />
    </>
  );
}

export default AddEvent;
