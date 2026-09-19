import { Link } from 'react-router';
import useEvents from '../context/useEvents';
import EventCard from '../components/EventCard';

//=== DASHBOARD PAGE ===
// Displays all upcoming events
function Dashboard() {
  const { events, deleteEvent } = useEvents();

  return (
    <div className="container py-4">
      {/* Dashboard heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Manage your upcoming events</p>
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

      {/* Events grid */}
      <div className="row g-3">
        {events.map(event => (
          <div className="col-12 col-md-6 col-lg-4" key={event.id}>
            <EventCard event={event} onDelete={deleteEvent} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

