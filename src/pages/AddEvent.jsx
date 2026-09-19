import { useState } from 'react';
import { useNavigate } from 'react-router';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';

// Default date and time based on current time
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};
const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // HH;MM format
};

//=== ADD EVENT PAGE ===
// Allows users to create a new event
function AddEvent() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = formData => {
    const { name, date, time, location, description } = formData;
    const today = new Date().toISOString().split('T')[0];

    if (date < today) {
      setError('Event date cannot be in the past.');
      return;
    }

    // Basic validation
    if (!name || !date || !time || !location || !description) {
      setError('Please fill in all fields.');
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
          date: getTodayDate(),
          time: getCurrentTime(),
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

