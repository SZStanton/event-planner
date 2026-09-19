//=== PAGE HEADING ===
// The title block every page opens with, so their spacing cannot drift apart
function PageHeading({ title, subtitle, action }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="mb-1">{title}</h2>
        <p className="text-muted mb-0">{subtitle}</p>
      </div>

      {action}
    </div>
  );
}

export default PageHeading;
