import { useState } from 'react';
import { Link } from 'react-router';
import ReactCalendar from 'react-calendar';
import useEvents from '../context/useEvents';
import EventGrid from '../components/EventGrid';
import PageHeading from '../components/PageHeading';
import { toDateValue, formatDate } from '../utils/dates';

import 'react-calendar/dist/Calendar.css';

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
    <>
      <PageHeading
        title="Calendar"
        subtitle="Pick a day to see what is on"
        action={
          <Link to="/add" className="btn btn-primary">
            Add Event
          </Link>
        }
      />

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
          <h3 className="h5 mb-3">{formatDate(selectedValue)}</h3>

          {onSelectedDay.length === 0 ? (
            <div className="alert alert-info">Nothing on this day.</div>
          ) : (
            <EventGrid
              events={onSelectedDay}
              onDelete={deleteEvent}
              columns="col-12 col-xl-6"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;
