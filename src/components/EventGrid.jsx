import EventCard from './EventCard';

//=== EVENT GRID ===
// A responsive row of event cards, shared by the dashboard and the calendar
function EventGrid({ events, onDelete, columns = 'col-12 col-md-6 col-lg-4' }) {
  return (
    <div className="row g-3">
      {events.map(event => (
        <div className={columns} key={event.id}>
          <EventCard event={event} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default EventGrid;
