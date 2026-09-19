import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import './App.css';

// Context
import { EventsProvider } from './context/EventsContext';

// Pages
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import Help from './pages/Help';

// Components
import Header from './components/Header';

// Main app structure + routing
function App() {
  return (
    <EventsProvider>
      <BrowserRouter>
        {/* Always visible header */}
        <Header />

        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/add" element={<AddEvent />} />
            <Route path="/edit/:id" element={<EditEvent />} />
            <Route path="/help" element={<Help />} />

            {/* Replace rather than push, so back does not land here again. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Render nothing. Both report only from a Vercel deployment. */}
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </EventsProvider>
  );
}

export default App;
