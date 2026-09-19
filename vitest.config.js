import { defineConfig } from 'vitest/config';

// Pin the suite to a negative UTC offset. Date logic is correct at UTC+2
// whether or not the bug is there, so testing in local time proves nothing.
// Set before the config is read, so workers inherit it.
process.env.TZ = 'America/New_York';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
