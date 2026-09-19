import { Link } from 'react-router';

//=== APP HEADER ===
// Top navigation bar shown on all pages, uses Bootstrap
function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark app-navbar px-3">
      {/* Brand/App title */}
      <Link className="navbar-brand app-brand" to="/">
        Event Planner
      </Link>

      {/* Toggle button (Bootstrap collapse) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible navigation section */}
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">
              Add Event
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/help">
              Help
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
