import { Link } from 'react-router';
import { formatDate } from '../utils/dates';

//=== EVENT CARD COMPONENT ===
// Reusable UI component for displaying a single event
function EventCard({ event, onDelete, past = false }) {
  return (
    <div
      className={`card h-100 shadow-sm event-card${past ? ' event-card-past' : ''}`}
    >
      <div className="card-body d-flex flex-column">
        {/* Event title */}
        <h5 className="card-title">{event.name}</h5>

        {/* Event details */}
        <p className="text-body-secondary mb-1">{formatDate(event.date)}</p>

        <p className="text-body-secondary mb-3">
          {event.time} &middot; {event.location}
        </p>

        <p className="card-text">{event.description}</p>

        {/* Action buttons, both sized to the longer of the two labels. */}
        <div className="mt-auto event-actions">
          {/* Edit event */}
          <Link to={`/edit/${event.id}`} className="btn event-edit">
            Edit
          </Link>

          {/* Delete event */}
          <button
            className="btn event-remove"
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
