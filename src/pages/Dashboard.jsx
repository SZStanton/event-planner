import { Link } from 'react-router';
import useEvents from '../context/useEvents';
import EventGrid from '../components/EventGrid';
import PageHeading from '../components/PageHeading';
import { hasPassed } from '../utils/dates';

// One titled block of cards, rendering nothing when its list is empty.
function EventSection({ title, events, onDelete, className }) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <h3 className="h5 mb-3">{title}</h3>

      <EventGrid events={events} onDelete={onDelete} />
    </section>
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
    <>
      <PageHeading
        title="Dashboard"
        subtitle="Manage your events"
        action={
          <Link to="/add" className="btn btn-primary">
            Add Event
          </Link>
        }
      />

      {/* Empty state */}
      {events.length === 0 && (
        <div className="alert alert-info">No events added yet.</div>
      )}

      <EventSection
        title="Upcoming"
        events={upcoming}
        onDelete={deleteEvent}
        className="mb-5"
      />
      <EventSection title="Past" events={past} onDelete={deleteEvent} />
    </>
  );
}

export default Dashboard;
