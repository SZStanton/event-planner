import HelpSection from '../components/HelpSection';
import PageHeading from '../components/PageHeading';

//=== HELP PAGE ===
// Displays guidance for using the app
function Help() {
  return (
    <>
      <PageHeading
        title="Help & Support"
        subtitle="Learn how to use the Event Planner application"
      />

      <HelpSection />
    </>
  );
}

export default Help;
