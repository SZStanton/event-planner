import { Link } from 'react-router';
import useEvents from '../context/useEvents';
import EventCard from '../components/EventCard';
import { hasPassed } from '../utils/dates';

// Shared by the upcoming and past lists.
function EventGrid({ events, onDelete }) {
  return (
    <div className="row g-3">
      {events.map(event => (
        <div className="col-12 col-md-6 col-lg-4" key={event.id}>
          <EventCard event={event} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

//=== DASHBOARD PAGE ===
// Displays events, split by whether they have already happened
function Dashboard() {
  const { events, deleteEvent } = useEvents();

  const upcoming = events.filter(event => !hasPassed(event));

  // Newest first, since the event that just finished is the one worth seeing.
  const past = events.filter(event => hasPassed(event)).reverse();

  return (
    <div className="container py-4">
      {/* Dashboard heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Manage your events</p>
        </div>

        {/* Add event button */}
        <Link to="/add" className="btn btn-primary">
          Add Event
        </Link>
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="alert alert-info">No events added yet.</div>
      )}

      {upcoming.length > 0 && (
        <section className="mb-5">
          <h3 className="h5 mb-3">Upcoming</h3>
          <EventGrid events={upcoming} onDelete={deleteEvent} />
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h3 className="h5 mb-3">Past</h3>
          <EventGrid events={past} onDelete={deleteEvent} />
        </section>
      )}
    </div>
  );
}

export default Dashboard;
