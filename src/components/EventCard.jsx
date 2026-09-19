import { Link } from 'react-router';
import { PencilSimple, Trash } from '@phosphor-icons/react';
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

        {/* Action buttons. Labelled, since the icons carry no text. */}
        <div className="mt-auto d-flex gap-2">
          {/* Edit event */}
          <Link
            to={`/edit/${event.id}`}
            className="btn btn-sm btn-outline-secondary"
            aria-label={`Edit ${event.name}`}
          >
            <PencilSimple size={18} />
          </Link>

          {/* Delete event */}
          <button
            className="btn btn-sm btn-outline-secondary event-remove"
            onClick={() => onDelete(event.id)}
            aria-label={`Delete ${event.name}`}
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
