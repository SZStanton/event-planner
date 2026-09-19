import { useState } from 'react';
import { Link } from 'react-router';
import ReactCalendar from 'react-calendar';
import useEvents from '../context/useEvents';
import EventCard from '../components/EventCard';
import { toDateValue } from '../utils/dates';

import 'react-calendar/dist/Calendar.css';

// Long form date for the panel heading, in the visitor's own locale.
const longDate = date =>
  date.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

//=== CALENDAR PAGE ===
// Month view of every event, with the selected day listed alongside
function Calendar() {
  const { events, deleteEvent } = useEvents();
  const [selected, setSelected] = useState(new Date());

  const selectedValue = toDateValue(selected);
  const onSelectedDay = events.filter(event => event.date === selectedValue);

  // Days holding at least one event, so a tile can be marked without scanning
  // the whole list for every cell drawn.
  const busyDays = new Set(events.map(event => event.date));

  // Mark a day that has something on it. Only the month view has day tiles.
  const tileContent = ({ date, view }) =>
    view === 'month' && busyDays.has(toDateValue(date)) ? (
      <span className="calendar-dot" />
    ) : null;

  return (
    <div className="container py-4">
      {/* Page heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Calendar</h2>
          <p className="text-muted mb-0">Pick a day to see what is on</p>
        </div>

        <Link to="/add" className="btn btn-primary">
          Add Event
        </Link>
      </div>

      <div className="row g-4">
        {/* Month grid */}
        <div className="col-12 col-lg-5">
          <div className="card p-3 event-calendar">
            <ReactCalendar
              onChange={setSelected}
              value={selected}
              tileContent={tileContent}
            />
          </div>
        </div>

        {/* The selected day */}
        <div className="col-12 col-lg-7">
          <h3 className="h5 mb-3">{longDate(selected)}</h3>

          {onSelectedDay.length === 0 ? (
            <div className="alert alert-info">Nothing on this day.</div>
          ) : (
            <div className="row g-3">
              {onSelectedDay.map(event => (
                <div className="col-12 col-xl-6" key={event.id}>
                  <EventCard event={event} onDelete={deleteEvent} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
