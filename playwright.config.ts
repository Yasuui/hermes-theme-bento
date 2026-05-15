import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './scripts',
  testMatch: 'recording.spec.ts',
  timeout: 120000,
  use: {
    baseURL: process.env.RECORD_URL || 'http://localhost:3000',
    video: 'on',
    launchOptions: {
      slowMo: 80,
    },
  },
  projects: [
    {
      name: 'flow',
      grep: /flow/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
        launchOptions: { slowMo: 80 },
      },
    },
    {
      name: 'cinema',
      grep: /cinema/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        launchOptions: { slowMo: 120 },
      },
    },
  ],
});
