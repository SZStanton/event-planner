import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

//=== EVENTS CONTEXT ===
// Creating the events context
const EventsContext = createContext(null);

// Local storage key for events
const EVENTS_KEY = 'planner-events';

// Load saved events from local storage
const loadEvents = () => {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
  } catch {
    return [];
  }
};

// Sort events by date and time
const sortEvents = list =>
  [...list].sort((left, right) => {
    const leftDate = new Date(`${left.date}T${left.time || '00:00'}`);
    const rightDate = new Date(`${right.date}T${right.time || '00:00'}`);

    return leftDate - rightDate;
  });

//=== EVENTS PROVIDER ===
function EventsProvider({ children }) {
  // Store all event items
  const [items, setItems] = useState(() => sortEvents(loadEvents()));

  // Save events whenever state changes
  useEffect(() => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(items));
  }, [items]);

  //=== EVENT FUNCTIONS ===
  // Add a new event
  const addEvent = useCallback(eventData => {
    const nextEvent = {
      id: crypto.randomUUID(),
      name: eventData.name.trim(),
      date: eventData.date,
      time: eventData.time,
      description: eventData.description.trim(),
      location: eventData.location.trim(),
      createdAt: new Date().toISOString(),
    };

    // Add and sort updated event list
    setItems(list => sortEvents([...list, nextEvent]));

    return nextEvent;
  }, []);

  // Update an existing event
  const updateEvent = useCallback((id, eventData) => {
    setItems(list =>
      sortEvents(
        list.map(item =>
          item.id === id
            ? {
                ...item,
                name: eventData.name.trim(),
                date: eventData.date,
                time: eventData.time,
                description: eventData.description.trim(),
                location: eventData.location.trim(),
              }
            : item,
        ),
      ),
    );
  }, []);

  // Remove an event
  const deleteEvent = useCallback(id => {
    setItems(list => list.filter(item => item.id !== id));
  }, []);

  // Get a single event by id
  const getEvent = useCallback(
    id => items.find(item => item.id === id),
    [items],
  );

  // === CONTEXT VALUES ===
  // Memorized context values
  const value = useMemo(
    () => ({ events: items, addEvent, updateEvent, deleteEvent, getEvent }),
    [items, addEvent, updateEvent, deleteEvent, getEvent],
  );

  // Provide events data to the app
  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export { EventsContext, EventsProvider };
