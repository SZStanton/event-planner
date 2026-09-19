import { useEffect, useState } from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

const STORAGE_KEY = 'planner-theme';

// Mirrors the inline script in index.html, which sets the theme before paint.
const initialTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Private browsing can refuse storage. Fall back to the OS preference.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

//=== THEME TOGGLE ===
// Switches Bootstrap between its light and dark themes, and remembers the choice
function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The theme still applies for this visit.
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-secondary theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun size={18} weight="fill" />
      ) : (
        <Moon size={18} weight="fill" />
      )}
    </button>
  );
}

export default ThemeToggle;
