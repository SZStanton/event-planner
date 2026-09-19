import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useEvents from '../context/useEvents';
import EventForm from '../components/EventForm';

//=== EDIT EVENT PAGE ===
// Allows users to edit existing event
function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent, updateEvent } = useEvents();

  const event = getEvent(id);
  const [error, setError] = useState('');

  // Redirect if event does not exist
  useEffect(() => {
    if (!event) {
      navigate('/');
    }
  }, [event, navigate]);

  // Handle form submission
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
        initialValues={{
          name: event?.name || '',
          date: event?.date || '',
          time: event?.time || '',
          location: event?.location || '',
          description: event?.description || '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Update Event"
        errorMessage={error}
      />
    </div>
  );
}

export default EditEvent;

