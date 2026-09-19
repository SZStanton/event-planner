import { Link } from 'react-router';

//=== HELP CONTENT COMPONENT ===
// Explains how to use the Event Planner App
function HelpSection() {
  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">How to use the Event Planner</h4>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Add Event:</strong> Create events with a name, date, time,
          location, and description.
        </li>
        <li className="list-group-item">
          <strong>Edit Event:</strong> Update any event details from the
          dashboard.
        </li>
        <li className="list-group-item">
          <strong>Delete Event:</strong> Remove events you no longer need.
        </li>
        <li className="list-group-item">
          <strong>Navigation:</strong> Use the top menu to move between
          Dashboard, Add Event, and Help.
        </li>
        <li className="list-group-item">
          <strong>Your data:</strong> Events are saved in this browser only, so
          they will not follow you to another device.
        </li>
      </ul>

      <div className="mt-3">
        <Link to="/" className="btn btn-primary btn-sm">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default HelpSection;

