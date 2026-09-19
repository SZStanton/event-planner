import { defineConfig } from 'vitest/config';

// Pin to a negative UTC offset. Date logic passes at UTC+2 either way, so local
// time proves nothing. Set out here so the workers inherit it.
process.env.TZ = 'America/New_York';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
