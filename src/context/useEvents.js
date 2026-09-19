import { useContext } from 'react';
import { EventsContext } from './EventsContext';

function useEvents() {
  const context = useContext(EventsContext);

  // Prevent using the hook outside the provider
  if (!context) {
    throw new Error('useEvents must be used inside an EventsProvider');
  }
  return context;
}

export default useEvents;
