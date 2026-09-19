import { useEffect, useState } from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

const STORAGE_KEY = 'planner-theme';

// The inline script in index.html resolves the theme before paint, so read its
// answer rather than deriving it a second time and risking the two disagreeing.
const initialTheme = () =>
  document.documentElement.getAttribute('data-bs-theme') === 'dark'
    ? 'dark'
    : 'light';

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
      className="btn btn-sm btn-outline-secondary mt-2 mt-lg-0"
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
