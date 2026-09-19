import { useState } from 'react';
import { Link } from 'react-router';

//=== APP HEADER ===
// Top navigation bar shown on all pages, uses Bootstrap
function Header() {
  // Toggle the menu in state, so Bootstrap's JS bundle is never needed.
  const [open, setOpen] = useState(false);

  // Close on navigate, which the collapse plugin would not do.
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark app-navbar px-3">
      {/* Brand/App title */}
      <Link className="navbar-brand app-brand" to="/" onClick={close}>
        Event Planner
      </Link>

      {/* Toggle button, shown below the lg breakpoint */}
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navMenu"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen(value => !value)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible navigation section */}
      <div
        className={`collapse navbar-collapse${open ? ' show' : ''}`}
        id="navMenu"
      >
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={close}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/calendar" onClick={close}>
              Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add" onClick={close}>
              Add Event
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/help" onClick={close}>
              Help
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
