import HelpSection from '../components/HelpSection';

//=== HELP PAGE ===
// Displays guidance for using the app
function Help() {
  return (
    <div className="container py-4">
      {/* Page Heading */}
      <div className="mb-4">
        <h2>Help & Support</h2>

        <p className="text-muted mb-0">
          Learn how to use the Event Planner application
        </p>
      </div>

      {/* Help Content */}
      <HelpSection />
    </div>
  );
}

export default Help;
