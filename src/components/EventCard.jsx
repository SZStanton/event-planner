import { Link } from 'react-router';

//=== EVENT CARD COMPONENT ===
// Reusable UI component for displaying a single event
function EventCard({ event, onDelete }) {
  return (
    <div className="card h-100 shadow-sm event-card">
      <div className="card-body d-flex flex-column">
        {/* Event title */}
        <h5 className="card-title">{event.name}</h5>

        {/* Event details */}
        <p className="mb-2">
          <strong>Date:</strong> {event.date}
        </p>

        <p className="mb-2">
          <strong>Time:</strong> {event.time}
        </p>

        <p className="mb-2">
          <strong>Location:</strong> {event.location}
        </p>

        <p className="card-text">{event.description}</p>

        {/* Action buttons */}
        <div className="mt-auto d-flex gap-2">
          {/* Edit event */}
          <Link to={`/edit/${event.id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>

          {/* Delete event */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(event.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

