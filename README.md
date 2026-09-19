# Event Planner

A planner that keeps your events in your own browser. No account, no sign up, no
server holding your diary. Open it and start adding things.

**[event-planner.szstanton.com](https://event-planner.szstanton.com)**

There is nothing to log into. Add an event and it is there when you come back.
Everything lives in your browser's local storage, so your events stay on the
device you created them on and are never sent anywhere.

## Screenshots

**Dashboard**

| Light                                                            | Dark                                                           |
| ---------------------------------------------------------------- | -------------------------------------------------------------- |
| ![Dashboard in the light theme](screenshots/dashboard-light.png) | ![Dashboard in the dark theme](screenshots/dashboard-dark.png) |

**Calendar**

| Light                                                          | Dark                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------ |
| ![Calendar in the light theme](screenshots/calendar-light.png) | ![Calendar in the dark theme](screenshots/calendar-dark.png) |

## Features

- Create, edit and delete events with a date, time, location and description
- Month calendar that marks every day holding an event, and lists a day's events
  when you pick it
- Dashboard separates what is coming up from what has already happened
- Light and dark themes, following your system by default with a switch to
  override it
- Validation that will not let an event be scheduled into the past, while still
  allowing a past event to be corrected
- Works down to phone width, including the navigation menu

## Tech Stack

| Area     | Choice                |
| -------- | --------------------- |
| UI       | React                 |
| Build    | Vite                  |
| Routing  | React Router          |
| Styling  | Bootstrap             |
| Calendar | react-calendar        |
| Icons    | Phosphor              |
| Storage  | Browser local storage |
| Hosting  | Vercel                |

## Getting Started

Clone the repository:

```bash
git clone https://github.com/SZStanton/Event-Planner
cd Event-Planner
```

Install dependencies:

```bash
npm install
```

There are no environment variables to set. The app has no backend, so there is
nothing to point it at.

The three commands that matter:

```bash
npm run dev      # development server on http://localhost:5173
npm run build    # production build into dist/
npm run lint     # eslint across src/
```

## What I Learned

- **`toISOString()` gives you the UTC date, not today's date.** Four places used
  it to work out "today", which at UTC+2 meant that between midnight and 02:00
  an event that had already happened passed validation. One helper now owns what
  "today" means, and it reads local time.

- **Removing the login was a fix, not a feature cut.** The first version had
  registration and accounts, but every account read and wrote the same storage
  key, so any user saw and could delete everyone else's events. Dropping accounts
  removed the bug and made the app honest about what it actually is.

- **Bootstrap bakes each button variant in at compile time.** Overriding the
  theme colour recolours a few borders and not one button. Every variant needs
  its own `--bs-btn-*` block, which is not obvious until you have changed the
  colour and watched nothing happen.

- **Specificity beats source order, and that cuts both ways.** A general
  `color: inherit` rule was quietly overriding the selected day's text colour in
  the calendar, leaving it at about 2:1 contrast in both themes. It looked fine
  in a screenshot. I only found it by reading computed values in the browser.

- **Contrast is a number, not an opinion.** The purple I wanted measured 4.40:1
  against white, just under the 4.5:1 that WCAG AA asks for on normal text. A
  slightly deeper shade takes it to 5.6:1 and looks the same to me.
