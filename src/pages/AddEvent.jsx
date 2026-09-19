import { useState } from 'react';
import { useNavigate } from 'react-router';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';
import { today, currentTime } from '../utils/dates';

//=== ADD EVENT PAGE ===
// Allows users to create a new event
function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = formData => {
    const { name, date, time, location, description } = formData;

    // Check for empties first. An empty date sorts below every real one, so the
    // past check would otherwise blame the wrong field.
    if (!name || !date || !time || !location || !description) {
      setError('Please fill in all fields.');
      return;
    }

    if (date < today()) {
      setError('Event date cannot be in the past.');
      return;
    }

    // Add new event to context
    addEvent(formData);

    // Redirect back to dashboard
    navigate('/');
  };

  return (
    <div className="container py-4">
      {/* Page heading */}
      <div className="mb-4">
        <h2>Add Event</h2>
        <p className="text-muted mb-0">Create a new event</p>
      </div>

      {/* Event form */}
      <EventForm
        initialValues={{
          name: '',
          date: today(),
          time: currentTime(),
          location: '',
          description: '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Event"
        errorMessage={error}
      />
    </div>
  );
}

export default AddEvent;
